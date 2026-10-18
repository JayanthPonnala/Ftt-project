export interface BlogLeadUser {
  name: string;
  email: string;
  phone: string;
  unlockedAt: number;
}

const STORAGE_KEY = "ftt_blog_lead";

/**
 * Checks whether the current user has already entered their details (Old User)
 */
export function isBlogUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.name && parsed.email);
  } catch {
    return false;
  }
}

/**
 * Retrieves the stored lead user details
 */
export function getBlogLeadUser(): BlogLeadUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Marks the blog as unlocked and saves the user's details to localStorage
 */
export function setBlogLeadUser(user: { name: string; email: string; phone: string }): void {
  if (typeof window === "undefined") return;
  try {
    const leadData: BlogLeadUser = {
      ...user,
      unlockedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leadData));
    // Dispatch event so any open modal or listening component updates immediately
    window.dispatchEvent(new CustomEvent("blog-unlocked", { detail: leadData }));
  } catch (err) {
    console.warn("Unable to save blog lead to localStorage:", err);
  }
}

/**
 * Trigger the login/lead-capture modal from anywhere on the site
 */
export function openBlogAccessModal(targetUrl: string = "/blog"): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("open-blog-access-modal", { detail: { targetUrl } })
  );
}
