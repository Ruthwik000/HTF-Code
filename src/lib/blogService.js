import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const BLOGS_COLLECTION = "blogs";

function toDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatShortDate(value) {
  const date = toDate(value);
  if (!date) return "Unknown";
  return date.toISOString().slice(0, 10);
}

function estimateReadTime(content) {
  const text = String(content || "").trim();
  if (!text) return "1 min";

  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function sanitizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => String(tag || "").trim())
      .filter(Boolean)
      .slice(0, 8);
  }

  return String(tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title) || `post-${Date.now()}`;
  let slug = baseSlug;
  let index = 1;

  while (true) {
    const snap = await getDoc(doc(db, BLOGS_COLLECTION, slug));
    if (!snap.exists()) {
      return slug;
    }
    index += 1;
    slug = `${baseSlug}-${index}`;
  }
}

function mapBlogDoc(docSnap) {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    slug: data.slug || docSnap.id,
    title: data.title || "Untitled",
    description: data.description || "",
    content: data.content || "",
    tags: sanitizeTags(data.tags),
    linkedProblemId: data.linkedProblemId || "",
    author: data.authorName || "Anonymous",
    authorId: data.authorId || "",
    authorPhotoURL: data.authorPhotoURL || null,
    readTime: data.readTime || estimateReadTime(data.content),
    date: formatShortDate(data.createdAt),
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  };
}

export async function getPublishedBlogs(limitCount = 50) {
  try {
    const blogsQuery = query(
      collection(db, BLOGS_COLLECTION),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(blogsQuery);
    return snapshot.docs.map(mapBlogDoc);
  } catch (error) {
    // Fallback when index/order fails: fetch all and sort client-side.
    const fallbackSnapshot = await getDocs(collection(db, BLOGS_COLLECTION));
    return fallbackSnapshot.docs
      .map(mapBlogDoc)
      .sort((a, b) => {
        const aTime = toDate(a.createdAt)?.getTime() || 0;
        const bTime = toDate(b.createdAt)?.getTime() || 0;
        return bTime - aTime;
      })
      .slice(0, limitCount);
  }
}

export async function getBlogBySlug(slug) {
  const cleanSlug = String(slug || "").trim();
  if (!cleanSlug) return null;

  const blogSnap = await getDoc(doc(db, BLOGS_COLLECTION, cleanSlug));
  if (!blogSnap.exists()) return null;
  return mapBlogDoc(blogSnap);
}

export async function createBlogPost({ title, description, content, tags, linkedProblemId }, user) {
  if (!user?.uid) {
    throw new Error("You must be logged in to create a blog post.");
  }

  const cleanTitle = String(title || "").trim();
  const cleanDescription = String(description || "").trim();
  const cleanContent = String(content || "").trim();
  const cleanTags = sanitizeTags(tags);

  if (!cleanTitle || !cleanDescription || !cleanContent) {
    throw new Error("Title, description, and content are required.");
  }

  const slug = await generateUniqueSlug(cleanTitle);
  const now = Timestamp.now();

  await setDoc(doc(db, BLOGS_COLLECTION, slug), {
    slug,
    title: cleanTitle,
    description: cleanDescription,
    content: cleanContent,
    tags: cleanTags,
    linkedProblemId: String(linkedProblemId || "").trim(),
    authorId: user.uid,
    authorName: user.displayName || user.email || "Anonymous",
    authorPhotoURL: user.photoURL || null,
    readTime: estimateReadTime(cleanContent),
    createdAt: now,
    updatedAt: now,
  });

  return slug;
}
