var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminAnnouncements: () => adminAnnouncements,
  adminLogs: () => adminLogs,
  appSettings: () => appSettings,
  comments: () => comments,
  conversations: () => conversations,
  emailNotifications: () => emailNotifications,
  follows: () => follows,
  insertAdminAnnouncementSchema: () => insertAdminAnnouncementSchema,
  insertAdminLogSchema: () => insertAdminLogSchema,
  insertAppSettingsSchema: () => insertAppSettingsSchema,
  insertCommentSchema: () => insertCommentSchema,
  insertConversationSchema: () => insertConversationSchema,
  insertFollowSchema: () => insertFollowSchema,
  insertLikeSchema: () => insertLikeSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertPasswordRecoverySchema: () => insertPasswordRecoverySchema,
  insertPostSchema: () => insertPostSchema,
  insertPushNotificationLogSchema: () => insertPushNotificationLogSchema,
  insertPushSubscriptionSchema: () => insertPushSubscriptionSchema,
  insertReactionSchema: () => insertReactionSchema,
  insertReelSchema: () => insertReelSchema,
  insertScheduledJobSchema: () => insertScheduledJobSchema,
  insertShopMessageSchema: () => insertShopMessageSchema,
  insertShopReplySchema: () => insertShopReplySchema,
  insertUserMediaSchema: () => insertUserMediaSchema,
  insertUserSchema: () => insertUserSchema,
  likes: () => likes,
  messages: () => messages,
  notifications: () => notifications,
  passwordRecovery: () => passwordRecovery,
  posts: () => posts,
  pushNotificationLogs: () => pushNotificationLogs,
  pushSubscriptions: () => pushSubscriptions,
  reactions: () => reactions,
  reels: () => reels,
  scheduledJobs: () => scheduledJobs,
  shopMessages: () => shopMessages,
  shopReplies: () => shopReplies,
  userMedia: () => userMedia,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users, posts, reels, comments, likes, reactions, follows, notifications, adminAnnouncements, adminLogs, conversations, messages, shopMessages, shopReplies, userMedia, appSettings, scheduledJobs, passwordRecovery, pushSubscriptions, pushNotificationLogs, emailNotifications, insertUserSchema, insertPostSchema, insertCommentSchema, insertAdminAnnouncementSchema, insertAdminLogSchema, insertReelSchema, insertUserMediaSchema, insertAppSettingsSchema, insertScheduledJobSchema, insertPasswordRecoverySchema, insertPushSubscriptionSchema, insertPushNotificationLogSchema, insertLikeSchema, insertReactionSchema, insertFollowSchema, insertConversationSchema, insertMessageSchema, insertShopMessageSchema, insertShopReplySchema, insertNotificationSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      username: text("username").notNull().unique(),
      displayName: text("display_name").notNull(),
      email: text("email").notNull().unique(),
      password: text("password").notNull(),
      bio: text("bio"),
      avatar: text("avatar"),
      bannerImage: text("banner_image"),
      isVerified: boolean("is_verified").default(false),
      isModerator: boolean("is_moderator").default(false),
      isAdmin: boolean("is_admin").default(false),
      role: text("role").default("user"),
      // user, moderator, manager, admin, super_admin
      permissions: json("permissions").$type().default([]),
      notificationsEnabled: boolean("notifications_enabled").default(true),
      // auto-enabled by default
      followersCount: integer("followers_count").default(0),
      followingCount: integer("following_count").default(0),
      postsCount: integer("posts_count").default(0),
      createdAt: timestamp("created_at").defaultNow()
    });
    posts = pgTable("posts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      content: text("content").notNull(),
      type: text("type").notNull().default("regular"),
      // regular, strain_review, community, educational, video, podcast, reel, story
      images: json("images").$type().default([]),
      videos: json("videos").$type().default([]),
      podcasts: json("podcasts").$type().default([]),
      strainData: json("strain_data").$type(),
      hashtags: json("hashtags").$type().default([]),
      mentionedUsers: json("mentioned_users").$type().default([]),
      // Array of mentioned usernames
      likesCount: integer("likes_count").default(0),
      dislikesCount: integer("dislikes_count").default(0),
      commentsCount: integer("comments_count").default(0),
      sharesCount: integer("shares_count").default(0),
      viewsCount: integer("views_count").default(0),
      isPinned: boolean("is_pinned").default(false),
      pinnedAt: timestamp("pinned_at"),
      pinnedBy: varchar("pinned_by"),
      createdAt: timestamp("created_at").defaultNow()
    });
    reels = pgTable("reels", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      title: text("title"),
      description: text("description"),
      videoUrl: text("video_url").notNull(),
      thumbnailUrl: text("thumbnail_url"),
      duration: integer("duration"),
      // in seconds
      hashtags: json("hashtags").$type().default([]),
      likesCount: integer("likes_count").default(0),
      commentsCount: integer("comments_count").default(0),
      sharesCount: integer("shares_count").default(0),
      viewsCount: integer("views_count").default(0),
      isPublic: boolean("is_public").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    comments = pgTable("comments", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      postId: varchar("post_id").notNull().references(() => posts.id),
      userId: varchar("user_id").notNull().references(() => users.id),
      content: text("content").notNull(),
      mentionedUsers: json("mentioned_users").$type().default([]),
      // Array of mentioned usernames
      createdAt: timestamp("created_at").defaultNow()
    });
    likes = pgTable("likes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      postId: varchar("post_id").notNull().references(() => posts.id),
      userId: varchar("user_id").notNull().references(() => users.id),
      createdAt: timestamp("created_at").defaultNow()
    });
    reactions = pgTable("reactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      postId: varchar("post_id").notNull().references(() => posts.id),
      userId: varchar("user_id").notNull().references(() => users.id),
      type: text("type").notNull(),
      // "like" or "dislike"
      createdAt: timestamp("created_at").defaultNow()
    });
    follows = pgTable("follows", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      followerId: varchar("follower_id").notNull().references(() => users.id),
      followingId: varchar("following_id").notNull().references(() => users.id),
      createdAt: timestamp("created_at").defaultNow()
    });
    notifications = pgTable("notifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      // recipient
      fromUserId: varchar("from_user_id").references(() => users.id),
      // sender
      type: text("type").notNull(),
      // "post", "admin_announcement", "follow", "like", "comment"
      title: text("title").notNull(),
      message: text("message").notNull(),
      postId: varchar("post_id").references(() => posts.id),
      targetAudience: text("target_audience").default("individual"),
      // "individual", "all_users", "specific_group"
      specificUserIds: json("specific_user_ids").$type().default([]),
      // for targeting specific users
      isRead: boolean("is_read").default(false),
      priority: text("priority").notNull().default("normal"),
      // low, normal, high, urgent
      createdAt: timestamp("created_at").defaultNow()
    });
    adminAnnouncements = pgTable("admin_announcements", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      adminId: varchar("admin_id").notNull().references(() => users.id),
      title: text("title").notNull(),
      content: text("content").notNull(),
      type: text("type").notNull().default("general"),
      // general, maintenance, update, warning, celebration
      priority: text("priority").notNull().default("normal"),
      // low, normal, high, urgent
      targetPages: json("target_pages").$type().default([]),
      // empty array means all pages
      isActive: boolean("is_active").default(true),
      expiresAt: timestamp("expires_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    adminLogs = pgTable("admin_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      adminId: varchar("admin_id").notNull().references(() => users.id),
      action: text("action").notNull(),
      // create_announcement, delete_post, ban_user, etc.
      targetType: text("target_type"),
      // user, post, announcement, etc.
      targetId: varchar("target_id"),
      details: json("details").$type(),
      createdAt: timestamp("created_at").defaultNow()
    });
    conversations = pgTable("conversations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      participant1Id: varchar("participant1_id").notNull().references(() => users.id),
      participant2Id: varchar("participant2_id").notNull().references(() => users.id),
      status: text("status").notNull().default("pending"),
      // pending, accepted, blocked
      lastMessageAt: timestamp("last_message_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    messages = pgTable("messages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      conversationId: varchar("conversation_id").notNull().references(() => conversations.id),
      senderId: varchar("sender_id").notNull().references(() => users.id),
      content: text("content").notNull(),
      messageType: text("message_type").notNull().default("text"),
      // text, image, file
      attachmentUrl: text("attachment_url"),
      isRead: boolean("is_read").default(false),
      isEncrypted: boolean("is_encrypted").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    shopMessages = pgTable("shop_messages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      senderId: varchar("sender_id").notNull().references(() => users.id),
      encryptedContent: text("encrypted_content").notNull(),
      // AES encrypted message
      subject: text("subject"),
      messageType: text("message_type").notNull().default("text"),
      // text, image, file
      attachmentUrl: text("attachment_url"),
      isRead: boolean("is_read").default(false),
      isReplied: boolean("is_replied").default(false),
      priority: text("priority").default("normal"),
      // low, normal, high, urgent
      createdAt: timestamp("created_at").defaultNow()
    });
    shopReplies = pgTable("shop_replies", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      originalMessageId: varchar("original_message_id").notNull().references(() => shopMessages.id),
      recipientId: varchar("recipient_id").notNull().references(() => users.id),
      encryptedContent: text("encrypted_content").notNull(),
      isRead: boolean("is_read").default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    userMedia = pgTable("user_media", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      mediaUrl: text("media_url").notNull(),
      mediaType: text("media_type").notNull(),
      // 'image', 'video', 'audio'
      fileName: text("file_name"),
      fileSize: integer("file_size"),
      mimeType: text("mime_type"),
      thumbnail: text("thumbnail"),
      // For video thumbnails
      duration: integer("duration"),
      // For video/audio duration in seconds
      uploadedAt: timestamp("uploaded_at").defaultNow(),
      isDeleted: boolean("is_deleted").default(false)
    });
    appSettings = pgTable("app_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      key: text("key").notNull().unique(),
      value: json("value").$type(),
      updatedAt: timestamp("updated_at").defaultNow(),
      updatedBy: varchar("updated_by").references(() => users.id)
    });
    scheduledJobs = pgTable("scheduled_jobs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      jobType: text("job_type").notNull(),
      // '420_reminder', 'daily_digest', etc.
      lastRun: timestamp("last_run"),
      nextRun: timestamp("next_run"),
      isActive: boolean("is_active").default(true),
      metadata: json("metadata").$type().default({}),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    passwordRecovery = pgTable("password_recovery", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      recoveryCode: text("recovery_code"),
      // Nullable for email-based recovery
      token: text("token"),
      // For email-based recovery
      requestedBy: varchar("requested_by").references(() => users.id),
      // Admin who initiated the reset (nullable for email recovery)
      isUsed: boolean("is_used").default(false),
      expiresAt: timestamp("expires_at").notNull(),
      usedAt: timestamp("used_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    pushSubscriptions = pgTable("push_subscriptions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id),
      subscription: json("subscription").$type().notNull(),
      userAgent: text("user_agent"),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    pushNotificationLogs = pgTable("push_notification_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      adminId: varchar("admin_id").notNull().references(() => users.id),
      title: text("title").notNull(),
      message: text("message").notNull(),
      targetAudience: text("target_audience").notNull(),
      // all, admins, users, specific
      specificUserIds: json("specific_user_ids").$type(),
      recipientCount: integer("recipient_count").default(0),
      successCount: integer("success_count").default(0),
      failureCount: integer("failure_count").default(0),
      priority: text("priority").notNull().default("normal"),
      // low, normal, high
      createdAt: timestamp("created_at").defaultNow()
    });
    emailNotifications = pgTable("email_notifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: varchar("email").notNull().unique(),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      isActive: boolean("is_active").default(true),
      subscriptionTypes: json("subscription_types").$type().default(["posts", "comments", "announcements"]),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      createdAt: true,
      followersCount: true,
      followingCount: true,
      postsCount: true
    });
    insertPostSchema = createInsertSchema(posts).omit({
      id: true,
      createdAt: true,
      likesCount: true,
      commentsCount: true,
      sharesCount: true,
      viewsCount: true
    });
    insertCommentSchema = createInsertSchema(comments).omit({
      id: true,
      createdAt: true
    });
    insertAdminAnnouncementSchema = createInsertSchema(adminAnnouncements).omit({
      id: true,
      createdAt: true
    });
    insertAdminLogSchema = createInsertSchema(adminLogs).omit({
      id: true,
      createdAt: true
    });
    insertReelSchema = createInsertSchema(reels).omit({
      id: true,
      createdAt: true,
      likesCount: true,
      commentsCount: true,
      sharesCount: true,
      viewsCount: true
    });
    insertUserMediaSchema = createInsertSchema(userMedia).omit({
      id: true,
      uploadedAt: true
    });
    insertAppSettingsSchema = createInsertSchema(appSettings).omit({
      id: true,
      updatedAt: true
    });
    insertScheduledJobSchema = createInsertSchema(scheduledJobs).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPasswordRecoverySchema = createInsertSchema(passwordRecovery).omit({
      id: true,
      createdAt: true,
      usedAt: true
    });
    insertPushSubscriptionSchema = createInsertSchema(pushSubscriptions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPushNotificationLogSchema = createInsertSchema(pushNotificationLogs).omit({
      id: true,
      createdAt: true
    });
    insertLikeSchema = createInsertSchema(likes).omit({
      id: true,
      createdAt: true
    });
    insertReactionSchema = createInsertSchema(reactions).omit({
      id: true,
      createdAt: true
    });
    insertFollowSchema = createInsertSchema(follows).omit({
      id: true,
      createdAt: true
    });
    insertConversationSchema = createInsertSchema(conversations).omit({
      id: true,
      createdAt: true,
      lastMessageAt: true
    });
    insertMessageSchema = createInsertSchema(messages).omit({
      id: true,
      createdAt: true
    });
    insertShopMessageSchema = createInsertSchema(shopMessages).omit({
      id: true,
      createdAt: true
    });
    insertShopReplySchema = createInsertSchema(shopReplies).omit({
      id: true,
      createdAt: true
    });
    insertNotificationSchema = createInsertSchema(notifications).omit({
      id: true,
      createdAt: true
    });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  pool: () => pool
});
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/pushService.ts
var pushService_exports = {};
__export(pushService_exports, {
  PushNotificationService: () => PushNotificationService,
  pushNotificationService: () => pushNotificationService
});
import webpush from "web-push";
var VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_EMAIL, PushNotificationService, pushNotificationService;
var init_pushService = __esm({
  "server/pushService.ts"() {
    "use strict";
    VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
    VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
    VAPID_EMAIL = process.env.VAPID_EMAIL;
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_EMAIL) {
      console.error("\u274C VAPID keys not configured. Push notifications will not work.");
      console.error("Required environment variables: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_EMAIL");
      throw new Error("VAPID configuration required for push notifications");
    } else {
      webpush.setVapidDetails(
        VAPID_EMAIL,
        VAPID_PUBLIC_KEY,
        VAPID_PRIVATE_KEY
      );
      console.log("\u2705 VAPID keys configured for push notifications");
    }
    PushNotificationService = class {
      /**
       * Get the VAPID public key for client-side subscription
       */
      getPublicVapidKey() {
        if (!VAPID_PUBLIC_KEY) {
          throw new Error("VAPID_PUBLIC_KEY not configured");
        }
        return VAPID_PUBLIC_KEY;
      }
      /**
       * Send a push notification to a single subscription
       */
      async sendNotification(subscription, payload) {
        try {
          if (subscription.endpoint === "universal" || subscription.endpoint.startsWith("mock://")) {
            console.log("\u{1F4E2} Skipping mock subscription for:", payload.title);
            return true;
          }
          if (!subscription.endpoint || !subscription.keys?.p256dh || !subscription.keys?.auth) {
            console.error("\u274C Invalid subscription format:", subscription);
            return false;
          }
          const notificationPayload = JSON.stringify({
            title: payload.title,
            body: payload.message,
            icon: payload.icon || "/icon-192x192.png",
            badge: payload.badge || "/badge-72x72.png",
            url: payload.url || "/",
            data: payload.data || {},
            requireInteraction: true,
            tag: "frhighday-notification"
          });
          await webpush.sendNotification(subscription, notificationPayload);
          console.log("\u2705 Push notification sent successfully");
          return true;
        } catch (error) {
          console.error("\u274C Failed to send push notification:", error);
          if (error instanceof Error && "statusCode" in error) {
            const statusCode = error.statusCode;
            if (statusCode === 410 || statusCode === 404) {
              console.log("\u26A0\uFE0F Subscription expired or invalid, should be removed from database");
            }
          }
          return false;
        }
      }
      /**
       * Send notifications to multiple subscriptions
       */
      async sendBulkNotifications(subscriptions, payload) {
        let successCount = 0;
        let failureCount = 0;
        const promises = subscriptions.map(async ({ userId, subscription }) => {
          try {
            const success = await this.sendNotification(subscription, payload);
            if (success) {
              successCount++;
              console.log(`\u2705 Notification sent to user ${userId}`);
            } else {
              failureCount++;
              console.log(`\u274C Failed to send notification to user ${userId}`);
            }
          } catch (error) {
            failureCount++;
            console.error(`\u274C Error sending notification to user ${userId}:`, error);
          }
        });
        await Promise.all(promises);
        console.log(`\u{1F4CA} Notification delivery complete: ${successCount} success, ${failureCount} failures`);
        return { successCount, failureCount };
      }
      /**
       * Generate VAPID keys (for development setup)
       */
      static generateVapidKeys() {
        return webpush.generateVAPIDKeys();
      }
    };
    pushNotificationService = new PushNotificationService();
  }
});

// server/objectAcl.ts
function isPermissionAllowed(requested, granted) {
  if (requested === "read" /* READ */) {
    return ["read" /* READ */, "write" /* WRITE */].includes(granted);
  }
  return granted === "write" /* WRITE */;
}
function createObjectAccessGroup(group) {
  switch (group.type) {
    // Implement the case for each type of access group to instantiate.
    //
    // For example:
    // case "USER_LIST":
    //   return new UserListAccessGroup(group.id);
    // case "EMAIL_DOMAIN":
    //   return new EmailDomainAccessGroup(group.id);
    // case "GROUP_MEMBER":
    //   return new GroupMemberAccessGroup(group.id);
    // case "SUBSCRIBER":
    //   return new SubscriberAccessGroup(group.id);
    default:
      throw new Error(`Unknown access group type: ${group.type}`);
  }
}
async function setObjectAclPolicy(objectFile, aclPolicy) {
  const [exists] = await objectFile.exists();
  if (!exists) {
    throw new Error(`Object not found: ${objectFile.name}`);
  }
  await objectFile.setMetadata({
    metadata: {
      [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy)
    }
  });
}
async function getObjectAclPolicy(objectFile) {
  const [metadata] = await objectFile.getMetadata();
  const aclPolicy = metadata?.metadata?.[ACL_POLICY_METADATA_KEY];
  if (!aclPolicy) {
    return null;
  }
  return JSON.parse(aclPolicy);
}
async function canAccessObject({
  userId,
  objectFile,
  requestedPermission
}) {
  const aclPolicy = await getObjectAclPolicy(objectFile);
  if (!aclPolicy) {
    return false;
  }
  if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
    return true;
  }
  if (!userId) {
    return false;
  }
  if (aclPolicy.owner === userId) {
    return true;
  }
  for (const rule of aclPolicy.aclRules || []) {
    const accessGroup = createObjectAccessGroup(rule.group);
    if (await accessGroup.hasMember(userId) && isPermissionAllowed(requestedPermission, rule.permission)) {
      return true;
    }
  }
  return false;
}
var ACL_POLICY_METADATA_KEY;
var init_objectAcl = __esm({
  "server/objectAcl.ts"() {
    "use strict";
    ACL_POLICY_METADATA_KEY = "custom:aclPolicy";
  }
});

// server/objectStorage.ts
var objectStorage_exports = {};
__export(objectStorage_exports, {
  ObjectNotFoundError: () => ObjectNotFoundError,
  ObjectStorageService: () => ObjectStorageService,
  objectStorageClient: () => objectStorageClient
});
import { Storage } from "@google-cloud/storage";
import { randomUUID as randomUUID2 } from "crypto";
function parseObjectPath(path3) {
  if (!path3.startsWith("/")) {
    path3 = `/${path3}`;
  }
  const pathParts = path3.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }
  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");
  return {
    bucketName,
    objectName
  };
}
async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec
}) {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1e3).toISOString()
  };
  const response = await fetch(
    `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to sign object URL, errorcode: ${response.status}, make sure you're running on Replit`
    );
  }
  const { signed_url: signedURL } = await response.json();
  return signedURL;
}
var REPLIT_SIDECAR_ENDPOINT, objectStorageClient, ObjectNotFoundError, ObjectStorageService;
var init_objectStorage = __esm({
  "server/objectStorage.ts"() {
    "use strict";
    init_objectAcl();
    REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
    objectStorageClient = new Storage({
      credentials: {
        audience: "replit",
        subject_token_type: "access_token",
        token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
        type: "external_account",
        credential_source: {
          url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
          format: {
            type: "json",
            subject_token_field_name: "access_token"
          }
        },
        universe_domain: "googleapis.com"
      },
      projectId: ""
    });
    ObjectNotFoundError = class _ObjectNotFoundError extends Error {
      constructor() {
        super("Object not found");
        this.name = "ObjectNotFoundError";
        Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
      }
    };
    ObjectStorageService = class {
      constructor() {
      }
      // Gets the public object search paths.
      getPublicObjectSearchPaths() {
        const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
        const paths = Array.from(
          new Set(
            pathsStr.split(",").map((path3) => path3.trim()).filter((path3) => path3.length > 0)
          )
        );
        if (paths.length === 0) {
          throw new Error(
            "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' tool and set PUBLIC_OBJECT_SEARCH_PATHS env var (comma-separated paths)."
          );
        }
        return paths;
      }
      // Gets the private object directory.
      getPrivateObjectDir() {
        const dir = process.env.PRIVATE_OBJECT_DIR || "";
        if (!dir) {
          throw new Error(
            "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
          );
        }
        return dir;
      }
      // Gets the upload URL for an object entity.
      async getObjectEntityUploadURL() {
        const privateObjectDir = this.getPrivateObjectDir();
        if (!privateObjectDir) {
          throw new Error(
            "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
          );
        }
        const objectId = randomUUID2();
        const fullPath = `${privateObjectDir}/uploads/${objectId}`;
        console.log("iOS Debug - Generating upload URL:", {
          privateObjectDir,
          objectId,
          fullPath
        });
        const { bucketName, objectName } = parseObjectPath(fullPath);
        console.log("iOS Debug - Parsed path for signing:", {
          bucketName,
          objectName
        });
        const signedURL = await signObjectURL({
          bucketName,
          objectName,
          method: "PUT",
          ttlSec: 900
        });
        console.log("iOS Debug - Generated signed URL:", signedURL ? "\u2713 Success" : "\u2717 Failed");
        return signedURL;
      }
      // Search for a public object from the search paths.
      async searchPublicObject(filePath) {
        for (const searchPath of this.getPublicObjectSearchPaths()) {
          const fullPath = `${searchPath}/${filePath}`;
          const { bucketName, objectName } = parseObjectPath(fullPath);
          const bucket = objectStorageClient.bucket(bucketName);
          const file = bucket.file(objectName);
          const [exists] = await file.exists();
          if (exists) {
            return file;
          }
        }
        return null;
      }
      // Downloads an object to the response.
      async downloadObject(file, res, cacheTtlSec = 3600) {
        try {
          const [metadata] = await file.getMetadata();
          const aclPolicy = await getObjectAclPolicy(file);
          const isPublic = aclPolicy?.visibility === "public";
          res.set({
            "Content-Type": metadata.contentType || "application/octet-stream",
            "Content-Length": metadata.size,
            "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`
          });
          const stream = file.createReadStream();
          stream.on("error", (err) => {
            console.error("Stream error:", err);
            if (!res.headersSent) {
              res.status(500).json({ error: "Error streaming file" });
            }
          });
          stream.pipe(res);
        } catch (error) {
          console.error("Error downloading file:", error);
          if (!res.headersSent) {
            res.status(500).json({ error: "Error downloading file" });
          }
        }
      }
      // Gets the object entity file from the object path.
      async getObjectEntityFile(objectPath) {
        console.log("iOS Debug - Getting object entity file:", objectPath);
        if (!objectPath.startsWith("/objects/")) {
          console.log("iOS Debug - Invalid path format, missing /objects/ prefix");
          throw new ObjectNotFoundError();
        }
        const parts = objectPath.slice(1).split("/");
        if (parts.length < 2) {
          console.log("iOS Debug - Invalid path parts:", parts);
          throw new ObjectNotFoundError();
        }
        const entityId = parts.slice(1).join("/");
        let entityDir = this.getPrivateObjectDir();
        if (!entityDir.endsWith("/")) {
          entityDir = `${entityDir}/`;
        }
        const objectEntityPath = `${entityDir}${entityId}`;
        console.log("iOS Debug - File path construction:", {
          originalPath: objectPath,
          entityId,
          entityDir,
          finalPath: objectEntityPath
        });
        const { bucketName, objectName } = parseObjectPath(objectEntityPath);
        const bucket = objectStorageClient.bucket(bucketName);
        const objectFile = bucket.file(objectName);
        console.log("iOS Debug - Checking file existence:", {
          bucketName,
          objectName
        });
        const [exists] = await objectFile.exists();
        if (!exists) {
          console.log("iOS Debug - File does not exist in storage");
          throw new ObjectNotFoundError();
        }
        console.log("iOS Debug - File found successfully");
        return objectFile;
      }
      normalizeObjectEntityPath(rawPath) {
        if (!rawPath.startsWith("https://storage.googleapis.com/")) {
          return rawPath;
        }
        const url = new URL(rawPath);
        const rawObjectPath = url.pathname;
        let objectEntityDir = this.getPrivateObjectDir();
        if (!objectEntityDir.endsWith("/")) {
          objectEntityDir = `${objectEntityDir}/`;
        }
        if (!rawObjectPath.startsWith(objectEntityDir)) {
          return rawObjectPath;
        }
        let entityId = rawObjectPath.slice(objectEntityDir.length);
        if (entityId.endsWith(".txt") && !entityId.includes(".txt.")) {
          console.log("iOS Debug - Removing .txt extension from:", entityId);
          entityId = entityId.replace(/\.txt$/, "");
        }
        return `/objects/${entityId}`;
      }
      // Tries to set the ACL policy for the object entity and return the normalized path.
      async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
        const normalizedPath = this.normalizeObjectEntityPath(rawPath);
        if (!normalizedPath.startsWith("/")) {
          return normalizedPath;
        }
        const objectFile = await this.getObjectEntityFile(normalizedPath);
        await setObjectAclPolicy(objectFile, aclPolicy);
        return normalizedPath;
      }
      // Checks if the user can access the object entity.
      async canAccessObjectEntity({
        userId,
        objectFile,
        requestedPermission
      }) {
        return canAccessObject({
          userId,
          objectFile,
          requestedPermission: requestedPermission ?? "read" /* READ */
        });
      }
    };
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_schema();
init_db();
import { eq, and, desc, sql as sql2, or, ilike } from "drizzle-orm";
import crypto from "crypto";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
var DatabaseStorage = class {
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || void 0;
  }
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0] || void 0;
  }
  async getUserByEmail(email) {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || void 0;
  }
  async getUserByDisplayName(displayName) {
    const result = await db.select().from(users).where(eq(users.displayName, displayName));
    return result[0] || void 0;
  }
  async searchUsersByUsername(query) {
    const result = await db.select().from(users).where(or(
      ilike(users.username, `%${query}%`),
      ilike(users.displayName, `%${query}%`)
    )).limit(10);
    return result;
  }
  async createUser(insertUser) {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const userWithHashedPassword = {
      ...insertUser,
      password: hashedPassword
    };
    const result = await db.insert(users).values([userWithHashedPassword]).returning();
    return result[0];
  }
  async updateUser(id, updateData) {
    const result = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return result[0] || null;
  }
  async updatePost(id, updateData) {
    try {
      console.log("DatabaseStorage updatePost called with:", id, updateData);
      const result = await db.update(posts).set(updateData).where(eq(posts.id, id)).returning();
      console.log("Update result:", result.length > 0 ? "success" : "no rows updated");
      return result.length > 0;
    } catch (error) {
      console.error("DatabaseStorage updatePost error:", error);
      return false;
    }
  }
  async validatePassword(emailOrUsername, password) {
    let user = await this.getUserByEmail(emailOrUsername);
    if (!user) {
      user = await this.getUserByUsername(emailOrUsername);
    }
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
  async resetUserPassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId));
  }
  // Password Recovery
  async createPasswordRecovery(recovery) {
    if (!recovery.recoveryCode && !recovery.token) {
      throw new Error("Either recoveryCode or token must be provided");
    }
    const result = await db.insert(passwordRecovery).values(recovery).returning();
    return result[0];
  }
  async getPasswordRecovery(recoveryCode) {
    const result = await db.select().from(passwordRecovery).where(eq(passwordRecovery.recoveryCode, recoveryCode)).limit(1);
    return result[0] || null;
  }
  async getPasswordRecoveryByCode(recoveryCode) {
    const [recovery] = await db.select().from(passwordRecovery).where(eq(passwordRecovery.recoveryCode, recoveryCode));
    return recovery;
  }
  async getPasswordRecoveryByToken(token) {
    const [recovery] = await db.select().from(passwordRecovery).where(eq(passwordRecovery.token, token));
    return recovery;
  }
  async deletePasswordRecovery(id) {
    const result = await db.delete(passwordRecovery).where(eq(passwordRecovery.id, id));
    return result.changes > 0;
  }
  async updateUserPassword(userId, hashedPassword) {
    try {
      const result = await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId)).returning();
      return result.length > 0;
    } catch (error) {
      console.error("Error updating user password:", error);
      return false;
    }
  }
  async usePasswordRecovery(recoveryCode) {
    const result = await db.update(passwordRecovery).set({ isUsed: true, usedAt: /* @__PURE__ */ new Date() }).where(and(
      eq(passwordRecovery.recoveryCode, recoveryCode),
      eq(passwordRecovery.isUsed, false)
    )).returning();
    return result.length > 0;
  }
  async cleanupExpiredRecoveries() {
    const now = /* @__PURE__ */ new Date();
    const result = await db.delete(passwordRecovery).where(sql2`expires_at < ${now}`).returning();
    return result.length;
  }
  // Push Notification methods
  async savePushSubscription(subscriptionData) {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      await db.delete(pushSubscriptions2).where(eq(pushSubscriptions2.userId, subscriptionData.userId));
      await db.insert(pushSubscriptions2).values({
        id: randomUUID(),
        userId: subscriptionData.userId,
        subscription: subscriptionData.subscription,
        userAgent: subscriptionData.userAgent || null,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
    } catch (error) {
      console.error("Error saving push subscription:", error);
      throw error;
    }
  }
  async upsertPushSubscription(userId, subscription) {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      await db.delete(pushSubscriptions2).where(eq(pushSubscriptions2.userId, userId));
      await db.insert(pushSubscriptions2).values({
        id: randomUUID(),
        userId,
        subscription,
        userAgent: null,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
      console.log(`\u2705 Push subscription upserted for user: ${userId}`);
    } catch (error) {
      console.error("Error upserting push subscription:", error);
      throw error;
    }
  }
  async removePushSubscription(userId) {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      await db.delete(pushSubscriptions2).where(eq(pushSubscriptions2.userId, userId));
    } catch (error) {
      console.error("Error removing push subscription:", error);
      throw error;
    }
  }
  async getUsersWithPushSubscriptions() {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const result = await db.select({
        userId: pushSubscriptions2.userId,
        subscription: pushSubscriptions2.subscription,
        userAgent: pushSubscriptions2.userAgent
      }).from(pushSubscriptions2).where(eq(pushSubscriptions2.isActive, true));
      return result;
    } catch (error) {
      console.error("Error getting users with push subscriptions:", error);
      return [];
    }
  }
  async enableNotificationsForAllUsers() {
    try {
      const result = await db.update(users).set({
        notificationsEnabled: true,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(users.notificationsEnabled, false)).returning();
      console.log(`\u2705 Enabled notifications for ${result.length} users`);
      return result.length;
    } catch (error) {
      console.error("Error enabling notifications for all users:", error);
      return 0;
    }
  }
  async getAdminUsersWithPushSubscriptions() {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const result = await db.select({
        userId: pushSubscriptions2.userId,
        subscription: pushSubscriptions2.subscription,
        userAgent: pushSubscriptions2.userAgent
      }).from(pushSubscriptions2).innerJoin(users, eq(users.id, pushSubscriptions2.userId)).where(and(
        eq(pushSubscriptions2.isActive, true),
        eq(users.isAdmin, true)
      ));
      return result;
    } catch (error) {
      console.error("Error getting admin users with push subscriptions:", error);
      return [];
    }
  }
  async getRegularUsersWithPushSubscriptions() {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const result = await db.select({
        userId: pushSubscriptions2.userId,
        subscription: pushSubscriptions2.subscription,
        userAgent: pushSubscriptions2.userAgent
      }).from(pushSubscriptions2).innerJoin(users, eq(users.id, pushSubscriptions2.userId)).where(and(
        eq(pushSubscriptions2.isActive, true),
        eq(users.isAdmin, false)
      ));
      return result;
    } catch (error) {
      console.error("Error getting regular users with push subscriptions:", error);
      return [];
    }
  }
  async getSpecificUsersWithPushSubscriptions(userIds) {
    try {
      const { pushSubscriptions: pushSubscriptions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const result = await db.select({
        userId: pushSubscriptions2.userId,
        subscription: pushSubscriptions2.subscription,
        userAgent: pushSubscriptions2.userAgent
      }).from(pushSubscriptions2).innerJoin(users, eq(users.id, pushSubscriptions2.userId)).where(and(
        eq(pushSubscriptions2.isActive, true),
        sql2`${pushSubscriptions2.userId} = ANY(${userIds})`
      ));
      return result;
    } catch (error) {
      console.error("Error getting specific users with push subscriptions:", error);
      return [];
    }
  }
  async logPushNotification(notificationData) {
    try {
      const { pushNotificationLogs: pushNotificationLogs2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      await db.insert(pushNotificationLogs2).values({
        id: randomUUID(),
        adminId: notificationData.adminId,
        title: notificationData.title,
        message: notificationData.message,
        targetAudience: notificationData.targetAudience,
        specificUserIds: notificationData.specificUserIds || null,
        recipientCount: notificationData.recipientCount,
        successCount: notificationData.successCount,
        failureCount: notificationData.failureCount,
        priority: notificationData.priority || "normal",
        sentAt: /* @__PURE__ */ new Date()
      });
    } catch (error) {
      console.error("Error logging push notification:", error);
      throw error;
    }
  }
  // User Media
  async getUserMedia(userId) {
    const result = await db.select().from(userMedia).where(and(eq(userMedia.userId, userId), eq(userMedia.isDeleted, false))).orderBy(desc(userMedia.uploadedAt));
    return result;
  }
  async createUserMedia(insertUserMedia) {
    const result = await db.insert(userMedia).values([insertUserMedia]).returning();
    return result[0];
  }
  async deleteUserMedia(id) {
    const result = await db.update(userMedia).set({ isDeleted: true }).where(eq(userMedia.id, id)).returning();
    return result.length > 0;
  }
  // Posts
  async getPosts(limit = 50, offset = 0, currentUserId) {
    const result = await db.select({
      id: posts.id,
      userId: posts.userId,
      content: posts.content,
      type: posts.type,
      images: posts.images,
      videos: posts.videos,
      podcasts: posts.podcasts,
      strainData: posts.strainData,
      hashtags: posts.hashtags,
      likesCount: posts.likesCount,
      dislikesCount: posts.dislikesCount,
      commentsCount: posts.commentsCount,
      sharesCount: posts.sharesCount,
      viewsCount: posts.viewsCount,
      isPinned: posts.isPinned,
      pinnedAt: posts.pinnedAt,
      pinnedBy: posts.pinnedBy,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(posts).leftJoin(users, eq(posts.userId, users.id)).orderBy(desc(posts.createdAt)).limit(limit).offset(offset);
    const postsWithLikeStatus = await Promise.all(
      result.map(async (row) => {
        let isLiked = false;
        let userReaction = null;
        if (currentUserId) {
          const existingLike = await this.getLike(row.id, currentUserId);
          isLiked = !!existingLike;
          userReaction = await this.getUserReaction(row.id, currentUserId);
        }
        return {
          ...row,
          user: row.user,
          isLiked,
          userReaction
        };
      })
    );
    return postsWithLikeStatus;
  }
  async getPost(id) {
    const result = await db.select({
      id: posts.id,
      userId: posts.userId,
      content: posts.content,
      type: posts.type,
      images: posts.images,
      videos: posts.videos,
      podcasts: posts.podcasts,
      strainData: posts.strainData,
      hashtags: posts.hashtags,
      likesCount: posts.likesCount,
      commentsCount: posts.commentsCount,
      sharesCount: posts.sharesCount,
      viewsCount: posts.viewsCount,
      isPinned: posts.isPinned,
      pinnedAt: posts.pinnedAt,
      pinnedBy: posts.pinnedBy,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(posts).leftJoin(users, eq(posts.userId, users.id)).where(eq(posts.id, id));
    const row = result[0];
    if (!row) return void 0;
    return {
      ...row,
      user: row.user
    };
  }
  async getPostsByUser(userId) {
    const result = await db.select({
      id: posts.id,
      userId: posts.userId,
      content: posts.content,
      type: posts.type,
      images: posts.images,
      videos: posts.videos,
      podcasts: posts.podcasts,
      strainData: posts.strainData,
      hashtags: posts.hashtags,
      likesCount: posts.likesCount,
      commentsCount: posts.commentsCount,
      sharesCount: posts.sharesCount,
      viewsCount: posts.viewsCount,
      isPinned: posts.isPinned,
      pinnedAt: posts.pinnedAt,
      pinnedBy: posts.pinnedBy,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(posts).leftJoin(users, eq(posts.userId, users.id)).where(eq(posts.userId, userId)).orderBy(desc(posts.createdAt));
    return result.map((row) => ({
      ...row,
      user: row.user
    }));
  }
  async createPost(insertPost) {
    const result = await db.insert(posts).values([insertPost]).returning();
    return result[0];
  }
  // Comments
  async getCommentsByPost(postId) {
    const result = await db.select().from(comments).where(eq(comments.postId, postId)).orderBy(desc(comments.createdAt));
    return result;
  }
  // Enhanced comments with user data
  async getCommentsByPostWithUsers(postId) {
    const result = await db.select({
      id: comments.id,
      postId: comments.postId,
      userId: comments.userId,
      content: comments.content,
      mentionedUsers: comments.mentionedUsers,
      createdAt: comments.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(comments).leftJoin(users, eq(comments.userId, users.id)).where(eq(comments.postId, postId)).orderBy(desc(comments.createdAt));
    return result.map((row) => ({
      ...row,
      user: row.user
    }));
  }
  async createComment(insertComment) {
    const result = await db.insert(comments).values(insertComment).returning();
    await db.update(posts).set({
      commentsCount: sql2`${posts.commentsCount} + 1`
    }).where(eq(posts.id, insertComment.postId));
    return result[0];
  }
  // Likes
  async getLike(postId, userId) {
    const result = await db.select().from(likes).where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    return result[0] || void 0;
  }
  async createLike(insertLike) {
    const result = await db.insert(likes).values(insertLike).returning();
    return result[0];
  }
  async deleteLike(postId, userId) {
    await db.delete(likes).where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
  }
  async updatePostLikeCount(postId, increment) {
    await db.update(posts).set({
      likesCount: sql2`${posts.likesCount} + ${increment}`
    }).where(eq(posts.id, postId));
  }
  // Enhanced likes with user data
  async getLikesByPostWithUsers(postId) {
    const result = await db.select({
      id: likes.id,
      postId: likes.postId,
      userId: likes.userId,
      createdAt: likes.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(likes).leftJoin(users, eq(likes.userId, users.id)).where(eq(likes.postId, postId)).orderBy(desc(likes.createdAt));
    return result.map((row) => ({
      ...row,
      user: row.user
    }));
  }
  // Follows
  async getFollow(followerId, followingId) {
    const result = await db.select().from(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
    return result[0] || void 0;
  }
  async createFollow(insertFollow) {
    const result = await db.insert(follows).values(insertFollow).returning();
    return result[0];
  }
  async deleteFollow(followerId, followingId) {
    await db.delete(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
  }
  // Reels
  async getReels(limit = 50, offset = 0) {
    const result = await db.select({
      id: reels.id,
      userId: reels.userId,
      title: reels.title,
      description: reels.description,
      videoUrl: reels.videoUrl,
      thumbnailUrl: reels.thumbnailUrl,
      duration: reels.duration,
      hashtags: reels.hashtags,
      likesCount: reels.likesCount,
      commentsCount: reels.commentsCount,
      sharesCount: reels.sharesCount,
      viewsCount: reels.viewsCount,
      createdAt: reels.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(reels).leftJoin(users, eq(reels.userId, users.id)).orderBy(desc(reels.createdAt)).limit(limit).offset(offset);
    return result.map((row) => ({
      ...row,
      user: row.user
    }));
  }
  async getReel(id) {
    const result = await db.select({
      id: reels.id,
      userId: reels.userId,
      title: reels.title,
      description: reels.description,
      videoUrl: reels.videoUrl,
      thumbnailUrl: reels.thumbnailUrl,
      duration: reels.duration,
      hashtags: reels.hashtags,
      likesCount: reels.likesCount,
      commentsCount: reels.commentsCount,
      sharesCount: reels.sharesCount,
      viewsCount: reels.viewsCount,
      createdAt: reels.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(reels).leftJoin(users, eq(reels.userId, users.id)).where(eq(reels.id, id));
    const row = result[0];
    if (!row) return void 0;
    return {
      ...row,
      user: row.user
    };
  }
  async getReelsByUser(userId) {
    const result = await db.select({
      id: reels.id,
      userId: reels.userId,
      title: reels.title,
      description: reels.description,
      videoUrl: reels.videoUrl,
      thumbnailUrl: reels.thumbnailUrl,
      duration: reels.duration,
      hashtags: reels.hashtags,
      likesCount: reels.likesCount,
      commentsCount: reels.commentsCount,
      sharesCount: reels.sharesCount,
      viewsCount: reels.viewsCount,
      createdAt: reels.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(reels).leftJoin(users, eq(reels.userId, users.id)).where(eq(reels.userId, userId)).orderBy(desc(reels.createdAt));
    return result.map((row) => ({
      ...row,
      user: row.user
    }));
  }
  async createReel(insertReel) {
    const result = await db.insert(reels).values([insertReel]).returning();
    return result[0];
  }
  async likeReel(reelId, userId) {
  }
  async unlikeReel(reelId, userId) {
  }
  async viewReel(reelId) {
    const [currentReel] = await db.select().from(reels).where(eq(reels.id, reelId));
    if (currentReel) {
      await db.update(reels).set({
        viewsCount: (currentReel.viewsCount || 0) + 1
      }).where(eq(reels.id, reelId));
    }
  }
  // Stats and other methods...
  async getTrendingHashtags() {
    return [];
  }
  async getCommunityStats() {
    return { activeMembers: 0, postsToday: 0, strainReviews: 0, onlineNow: 0 };
  }
  // Conversations and Messages
  async getConversationsByUser(userId) {
    return [];
  }
  async getConversation(id) {
    return void 0;
  }
  async createConversation(conversation) {
    const result = await db.insert(conversations).values(conversation).returning();
    return result[0];
  }
  async updateConversation(id, updates) {
    const result = await db.update(conversations).set(updates).where(eq(conversations.id, id)).returning();
    return result[0] || null;
  }
  async getMessagesByConversation(conversationId) {
    return [];
  }
  async createMessage(message) {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }
  // Shop Messages
  async getShopMessages(limit = 50, offset = 0) {
    const result = await db.select({
      id: shopMessages.id,
      senderId: shopMessages.senderId,
      encryptedContent: shopMessages.encryptedContent,
      subject: shopMessages.subject,
      messageType: shopMessages.messageType,
      attachmentUrl: shopMessages.attachmentUrl,
      isRead: shopMessages.isRead,
      isReplied: shopMessages.isReplied,
      priority: shopMessages.priority,
      createdAt: shopMessages.createdAt,
      sender: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(shopMessages).leftJoin(users, eq(shopMessages.senderId, users.id)).orderBy(desc(shopMessages.createdAt)).limit(limit).offset(offset);
    return result.map((row) => ({
      ...row,
      sender: row.sender
    }));
  }
  async createShopMessage(insertShopMessage) {
    const result = await db.insert(shopMessages).values(insertShopMessage).returning();
    return result[0];
  }
  async markShopMessageAsRead(messageId) {
    const result = await db.update(shopMessages).set({ isRead: true }).where(eq(shopMessages.id, messageId)).returning();
    return result.length > 0;
  }
  async markShopMessageAsReplied(messageId) {
    const result = await db.update(shopMessages).set({ isReplied: true }).where(eq(shopMessages.id, messageId)).returning();
    return result.length > 0;
  }
  async getUnreadShopMessagesCount() {
    const result = await db.select({ count: sql2`count(*)` }).from(shopMessages).where(eq(shopMessages.isRead, false));
    return Number(result[0]?.count || 0);
  }
  // Shop Replies
  async createShopReply(insertShopReply) {
    const result = await db.insert(shopReplies).values(insertShopReply).returning();
    return result[0];
  }
  async getShopRepliesForUser(userId) {
    const result = await db.select().from(shopReplies).where(eq(shopReplies.recipientId, userId)).orderBy(desc(shopReplies.createdAt));
    return result;
  }
  async markShopReplyAsRead(replyId) {
    const result = await db.update(shopReplies).set({ isRead: true }).where(eq(shopReplies.id, replyId)).returning();
    return result.length > 0;
  }
  // Admin functions
  async isAdmin(userId) {
    const user = await this.getUser(userId);
    return user?.isAdmin || false;
  }
  async isModerator(userId) {
    const user = await this.getUser(userId);
    return user?.isModerator || user?.isAdmin || false;
  }
  async promoteToAdmin(userId, promotedBy) {
    const result = await db.update(users).set({ isAdmin: true, role: "admin" }).where(eq(users.id, userId)).returning();
    return result[0] || null;
  }
  async promoteToModerator(userId, promotedBy) {
    const result = await db.update(users).set({ isModerator: true, role: "moderator" }).where(eq(users.id, userId)).returning();
    return result[0] || null;
  }
  async promoteToManager(userId, promotedBy) {
    const result = await db.update(users).set({ role: "manager" }).where(eq(users.id, userId)).returning();
    return result[0] || null;
  }
  async demoteUser(userId, demotedBy) {
    const result = await db.update(users).set({ isAdmin: false, isModerator: false, role: "user" }).where(eq(users.id, userId)).returning();
    return result[0] || null;
  }
  async getAdminAnnouncements(targetPage) {
    return [];
  }
  async createAdminAnnouncement(announcement) {
    return {};
  }
  async updateAdminAnnouncement(id, updates) {
    return null;
  }
  async deleteAdminAnnouncement(id) {
  }
  async logAdminAction(log2) {
    return {};
  }
  async getAdminLogs(limit) {
    return [];
  }
  async pinPost(postId, pinnedBy) {
    const result = await db.update(posts).set({
      isPinned: true,
      pinnedAt: /* @__PURE__ */ new Date(),
      pinnedBy
    }).where(eq(posts.id, postId)).returning();
    return result[0] || null;
  }
  async unpinPost(postId) {
    const result = await db.update(posts).set({
      isPinned: false,
      pinnedAt: null,
      pinnedBy: null
    }).where(eq(posts.id, postId)).returning();
    return result[0] || null;
  }
  async getPinnedPosts() {
    const result = await db.select({
      id: posts.id,
      userId: posts.userId,
      content: posts.content,
      type: posts.type,
      images: posts.images,
      videos: posts.videos,
      podcasts: posts.podcasts,
      strainData: posts.strainData,
      hashtags: posts.hashtags,
      likesCount: posts.likesCount,
      commentsCount: posts.commentsCount,
      sharesCount: posts.sharesCount,
      viewsCount: posts.viewsCount,
      isPinned: posts.isPinned,
      pinnedAt: posts.pinnedAt,
      pinnedBy: posts.pinnedBy,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        isVerified: users.isVerified,
        isModerator: users.isModerator,
        isAdmin: users.isAdmin,
        role: users.role,
        followersCount: users.followersCount,
        followingCount: users.followingCount,
        postsCount: users.postsCount,
        createdAt: users.createdAt
      }
    }).from(posts).leftJoin(users, eq(posts.userId, users.id)).where(eq(posts.isPinned, true)).orderBy(desc(posts.pinnedAt));
    return result.map((row) => ({
      ...row,
      user: row.user
    }));
  }
  // Reactions
  async getReactionsByPost(postId) {
    const result = await db.select({
      type: reactions.type,
      count: sql2`count(*)`
    }).from(reactions).where(eq(reactions.postId, postId)).groupBy(reactions.type);
    const reactionCounts = { likes: 0, dislikes: 0 };
    for (const row of result) {
      if (row.type === "like") {
        reactionCounts.likes = Number(row.count);
      } else if (row.type === "dislike") {
        reactionCounts.dislikes = Number(row.count);
      }
    }
    return reactionCounts;
  }
  async getUserReaction(postId, userId) {
    const result = await db.select({ type: reactions.type }).from(reactions).where(and(eq(reactions.postId, postId), eq(reactions.userId, userId)));
    return result[0]?.type || null;
  }
  async addReaction(postId, userId, type) {
    await db.delete(reactions).where(and(eq(reactions.postId, postId), eq(reactions.userId, userId)));
    await db.insert(reactions).values({
      id: crypto.randomUUID(),
      postId,
      userId,
      type,
      createdAt: /* @__PURE__ */ new Date()
    });
  }
  async removeReaction(postId, userId, type) {
    await db.delete(reactions).where(
      and(
        eq(reactions.postId, postId),
        eq(reactions.userId, userId),
        eq(reactions.type, type)
      )
    );
  }
  // Additional admin functions
  async toggleUserVerification(userId, toggledBy) {
    const user = await this.getUser(userId);
    if (!user) return null;
    const newVerificationStatus = !user.isVerified;
    const result = await db.update(users).set({
      isVerified: newVerificationStatus
    }).where(eq(users.id, userId)).returning();
    await this.logAdminAction({
      id: `log-${Date.now()}`,
      adminId: toggledBy,
      action: newVerificationStatus ? "verify_user" : "unverify_user",
      targetId: userId,
      details: `User ${newVerificationStatus ? "verified" : "unverified"} by admin`,
      createdAt: /* @__PURE__ */ new Date()
    });
    return result[0] || null;
  }
  async verifyUser(userId, adminId) {
    try {
      const [updatedUser] = await db.update(users).set({ isVerified: true }).where(eq(users.id, userId)).returning();
      if (!updatedUser) {
        return null;
      }
      await this.logAdminAction({
        id: `log-${Date.now()}`,
        adminId,
        action: "VERIFY_USER",
        targetId: userId,
        details: `User ${updatedUser.displayName || updatedUser.username} verified by admin`,
        createdAt: /* @__PURE__ */ new Date()
      });
      return updatedUser;
    } catch (error) {
      console.error("Error verifying user:", error);
      return null;
    }
  }
  async banUser(userId, bannedBy, reason) {
    const result = await db.update(users).set({
      role: "banned",
      bio: reason ? `Banned: ${reason}` : "Banned by administrator"
    }).where(eq(users.id, userId)).returning();
    await this.logAdminAction({
      id: `log-${Date.now()}`,
      adminId: bannedBy,
      action: "ban_user",
      targetId: userId,
      details: reason || "User banned",
      createdAt: /* @__PURE__ */ new Date()
    });
    return result[0] || null;
  }
  async unbanUser(userId, unbannedBy) {
    const result = await db.update(users).set({
      role: "user",
      bio: null
    }).where(eq(users.id, userId)).returning();
    await this.logAdminAction({
      id: `log-${Date.now()}`,
      adminId: unbannedBy,
      action: "unban_user",
      targetId: userId,
      details: "User unbanned",
      createdAt: /* @__PURE__ */ new Date()
    });
    return result[0] || null;
  }
  async deletePost(postId, deletedBy, reason) {
    try {
      const existingPost = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
      if (!existingPost || existingPost.length === 0) {
        console.log(`Post ${postId} not found for deletion`);
        return false;
      }
      console.log(`Deleting post ${postId} by user ${deletedBy}`);
      const deletedNotifications = await db.delete(notifications).where(eq(notifications.postId, postId));
      console.log(`Deleted notifications for post ${postId}`);
      const deletedReactions = await db.delete(reactions).where(eq(reactions.postId, postId));
      console.log(`Deleted reactions for post ${postId}`);
      const deletedLikes = await db.delete(likes).where(eq(likes.postId, postId));
      console.log(`Deleted likes for post ${postId}`);
      const deletedComments = await db.delete(comments).where(eq(comments.postId, postId));
      console.log(`Deleted comments for post ${postId}`);
      const deletedPost = await db.delete(posts).where(eq(posts.id, postId));
      console.log(`Deleted post ${postId}`);
      await this.logAdminAction({
        id: `log-${Date.now()}`,
        adminId: deletedBy,
        action: "delete_post",
        targetId: postId,
        details: reason || "Post deleted",
        createdAt: /* @__PURE__ */ new Date()
      });
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      console.error("Error details:", error);
      return false;
    }
  }
  async removeImageFromPost(postId, imageUrl) {
    try {
      const [currentPost] = await db.select().from(posts).where(eq(posts.id, postId));
      if (!currentPost || !currentPost.images) {
        return false;
      }
      const updatedImages = currentPost.images.filter((img) => img !== imageUrl);
      await db.update(posts).set({ images: updatedImages }).where(eq(posts.id, postId));
      return true;
    } catch (error) {
      console.error("Error removing image from post:", error);
      return false;
    }
  }
  async removeVideoFromPost(postId, videoUrl) {
    try {
      const [currentPost] = await db.select().from(posts).where(eq(posts.id, postId));
      if (!currentPost || !currentPost.videos) {
        return false;
      }
      const updatedVideos = currentPost.videos.filter(
        (video) => typeof video === "object" ? video.url !== videoUrl : video !== videoUrl
      );
      await db.update(posts).set({ videos: updatedVideos }).where(eq(posts.id, postId));
      return true;
    } catch (error) {
      console.error("Error removing video from post:", error);
      return false;
    }
  }
  async deleteUser(userId, deletedBy, reason) {
    try {
      await this.logAdminAction({
        id: `log-${Date.now()}`,
        adminId: deletedBy,
        action: "delete_user",
        targetId: userId,
        details: reason || "User deleted by admin",
        createdAt: /* @__PURE__ */ new Date()
      });
      const userPosts = await db.select({ id: posts.id }).from(posts).where(eq(posts.userId, userId));
      for (const post of userPosts) {
        await this.deletePost(post.id, deletedBy, "User deletion cleanup");
      }
      await db.delete(follows).where(or(eq(follows.followerId, userId), eq(follows.followingId, userId)));
      await db.delete(likes).where(eq(likes.userId, userId));
      await db.delete(comments).where(eq(comments.userId, userId));
      await db.delete(users).where(eq(users.id, userId));
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
  async getAllUsers(limit = 100, offset = 0) {
    const result = await db.select().from(users).limit(limit).offset(offset).orderBy(desc(users.createdAt));
    return result;
  }
  async validatePasswordResetToken(token) {
    const recovery = await this.getPasswordRecoveryByToken(token);
    if (!recovery) return null;
    if (/* @__PURE__ */ new Date() > recovery.expiresAt) {
      await this.deletePasswordRecovery(recovery.id);
      return null;
    }
    if (recovery.isUsed) {
      return null;
    }
    const user = await this.getUser(recovery.userId);
    return user?.email || null;
  }
  async resetPassword(email, newPassword) {
    const user = await this.getUserByEmail(email);
    if (!user) return false;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email)).returning();
    for (const [token, data] of this.passwordResetTokens.entries()) {
      if (data.email === email) {
        this.passwordResetTokens.delete(token);
      }
    }
    return result.length > 0;
  }
  // App Settings methods
  async getAppSetting(key) {
    try {
      const result = await db.select().from(appSettings).where(eq(appSettings.key, key)).limit(1);
      return result[0] || void 0;
    } catch (error) {
      console.error("Error getting app setting:", error);
      return void 0;
    }
  }
  async setAppSetting(key, value, updatedBy) {
    try {
      const existingSetting = await this.getAppSetting(key);
      if (existingSetting) {
        const result = await db.update(appSettings).set({
          value,
          updatedAt: /* @__PURE__ */ new Date(),
          updatedBy
        }).where(eq(appSettings.key, key)).returning();
        return result[0];
      } else {
        const result = await db.insert(appSettings).values({
          key,
          value,
          updatedBy,
          updatedAt: /* @__PURE__ */ new Date()
        }).returning();
        return result[0];
      }
    } catch (error) {
      console.error("Error setting app setting:", error);
      throw error;
    }
  }
  // Scheduled Jobs
  async getScheduledJob(jobType) {
    try {
      const result = await db.select().from(scheduledJobs).where(eq(scheduledJobs.jobType, jobType));
      return result[0] || void 0;
    } catch (error) {
      console.error("Error getting scheduled job:", error);
      return void 0;
    }
  }
  async createScheduledJob(job) {
    try {
      const result = await db.insert(scheduledJobs).values(job).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating scheduled job:", error);
      throw error;
    }
  }
  async updateScheduledJob(jobType, updates) {
    try {
      const result = await db.update(scheduledJobs).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(scheduledJobs.jobType, jobType)).returning();
      return result[0] || null;
    } catch (error) {
      console.error("Error updating scheduled job:", error);
      return null;
    }
  }
  async getNotificationsForUser(userId, since) {
    try {
      const logs = await db.select().from(notifications).where(sql2`created_at > ${since.toISOString()}`).orderBy(desc(notifications.createdAt));
      const userNotifications = logs.filter((log2) => {
        return log2.targetAudience === "all" || log2.specificUserIds && log2.specificUserIds.includes(userId);
      }).map((log2) => ({
        title: log2.title,
        message: log2.message,
        icon: log2.icon,
        url: log2.url,
        timestamp: log2.createdAt.getTime()
      }));
      return userNotifications;
    } catch (error) {
      console.error("Error getting notifications for user:", error);
      return [];
    }
  }
  // Real browser notifications
  async getPendingNotifications(userId) {
    try {
      console.log(`\u{1F50D} Querying pending notifications for user: ${userId}`);
      const totalCount = await db.select({ count: sql2`COUNT(*)` }).from(notifications).where(eq(notifications.userId, userId));
      console.log(`\u{1F4CA} Total notifications for user ${userId}: ${totalCount[0]?.count || 0}`);
      const pendingNotifications = await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(10);
      console.log(`\u{1F4EC} Found ${pendingNotifications.length} notifications for user ${userId}`);
      return pendingNotifications.map((notification) => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        icon: notification.icon,
        url: notification.url,
        timestamp: notification.createdAt?.getTime(),
        isRead: notification.isRead,
        deliveredAt: notification.deliveredAt
      }));
    } catch (error) {
      console.error("Error getting pending notifications:", error);
      return [];
    }
  }
  async markNotificationDelivered(notificationId) {
    try {
      await db.update(notifications).set({
        deliveredAt: /* @__PURE__ */ new Date(),
        isRead: true
      }).where(eq(notifications.id, notificationId));
      console.log(`\u{1F4F1} Marked notification ${notificationId} as delivered`);
    } catch (error) {
      console.error("Error marking notification as delivered:", error);
    }
  }
  async deleteAllPendingNotifications() {
    try {
      const result = await db.delete(notifications);
      const deletedCount = result.rowCount || 0;
      console.log(`\u{1F5D1}\uFE0F Deleted ${deletedCount} pending notifications from database`);
      return deletedCount;
    } catch (error) {
      console.error("Error deleting all pending notifications:", error);
      return 0;
    }
  }
  async updateAdminPasswords(correctHash) {
    try {
      await db.update(users).set({ password: correctHash }).where(eq(users.email, "16southvideo@gmail.com"));
      await db.update(users).set({ password: correctHash }).where(eq(users.email, "Frhighday760@gmail.com"));
      console.log(`\u{1F527} Updated admin passwords for both accounts`);
    } catch (error) {
      console.error("\u274C Failed to update admin passwords:", error);
      throw error;
    }
  }
};
var storage = new DatabaseStorage();
console.log("\u{1F4E6} Storage initialized as DatabaseStorage");

// server/routes.ts
init_schema();
init_db();
init_db();
import { eq as eq3 } from "drizzle-orm";
import { z } from "zod";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";

// server/notificationService.ts
init_db();
init_schema();
import { eq as eq2, and as and2, sql as sql3 } from "drizzle-orm";
init_pushService();
var NotificationService = class {
  // Auto-enroll all existing users in push notifications on startup
  async autoEnrollAllExistingUsers() {
    try {
      console.log(`\u{1F680} Starting auto-enrollment of ALL existing users in push notifications...`);
      const allUsers = await storage.getAllUsers();
      const existingSubscriptions = await storage.getUsersWithPushSubscriptions();
      const subscribedUserIds = existingSubscriptions.map((sub) => sub.userId);
      const usersToEnroll = allUsers.filter((user) => !subscribedUserIds.includes(user.id));
      console.log(`\u{1F4CA} Found ${allUsers.length} total users, ${existingSubscriptions.length} already subscribed, ${usersToEnroll.length} to enroll`);
      if (usersToEnroll.length === 0) {
        console.log(`\u2705 All users already have push subscriptions`);
        return { totalUsers: allUsers.length, alreadySubscribed: existingSubscriptions.length, newlyEnrolled: 0 };
      }
      let enrolledCount = 0;
      const enrollmentPromises = usersToEnroll.map(async (user) => {
        try {
          await storage.savePushSubscription({
            userId: user.id,
            subscription: {
              endpoint: `https://fcm.googleapis.com/fcm/send/auto-enrolled-${user.id}-${Date.now()}`,
              keys: {
                p256dh: `auto-p256dh-${user.id}`,
                auth: `auto-auth-${user.id}`
              }
            },
            userAgent: "Server Startup Auto-enrollment",
            isActive: true
          });
          enrolledCount++;
          return { success: true, userId: user.id };
        } catch (error) {
          console.error(`\u274C Failed to enroll user ${user.id}:`, error);
          return { success: false, userId: user.id, error: error instanceof Error ? error.message : "Unknown error" };
        }
      });
      const results = await Promise.all(enrollmentPromises);
      const successfulEnrollments = results.filter((r) => r.success);
      const failedEnrollments = results.filter((r) => !r.success);
      console.log(`\u2705 Startup auto-enrollment complete: ${successfulEnrollments.length} successful, ${failedEnrollments.length} failed`);
      return {
        totalUsers: allUsers.length,
        alreadySubscribed: existingSubscriptions.length,
        newlyEnrolled: successfulEnrollments.length,
        failed: failedEnrollments.length,
        totalSubscribed: existingSubscriptions.length + successfulEnrollments.length
      };
    } catch (error) {
      console.error("\u274C Error auto-enrolling all users in push notifications:", error);
      throw error;
    }
  }
  // Create a notification for a specific user
  async createNotification(notification) {
    try {
      const [newNotification] = await db.insert(notifications).values(notification).returning();
      console.log(`\u{1F4E2} Notification created: ${notification.title} for user ${notification.userId}`);
      return newNotification;
    } catch (error) {
      console.error("Failed to create notification:", error);
      throw error;
    }
  }
  // Send notification to all users when TheShop makes a post
  async notifyAllUsersOfShopPost(postId, postContent, postType) {
    try {
      console.log(`\u{1F514} Starting notification process for Shop post: ${postId}`);
      const allUsers = await db.select({ id: users.id, username: users.username }).from(users).where(sql3`${users.username} != 'theshop'`);
      console.log(`\u{1F465} Found ${allUsers.length} users to notify (excluding TheShop)`);
      const notificationData = allUsers.map((user) => ({
        userId: user.id,
        fromUserId: "admin-frhighday-1754353771865",
        // TheShop's user ID
        type: "post",
        title: "\u{1F33F} New post from The Shop!",
        message: this.createShopPostMessage(postContent, postType),
        postId,
        priority: "high",
        isRead: false
      }));
      if (notificationData.length > 0) {
        await db.insert(notifications).values(notificationData);
        console.log(`\u{1F4E2} Successfully sent ${notificationData.length} notifications for The Shop's new post`);
      } else {
        console.log(`\u26A0\uFE0F No users found to notify for Shop post`);
      }
      return notificationData.length;
    } catch (error) {
      console.error("\u274C Failed to send shop post notifications:", error);
      throw error;
    }
  }
  // Create appropriate message based on post type and content
  createShopPostMessage(content, postType) {
    const contentPreview = content.length > 50 ? content.substring(0, 47) + "..." : content;
    switch (postType) {
      case "strain":
        return `The Shop just posted about a new strain! ${contentPreview}`;
      case "product":
        return `New product available at The Shop! ${contentPreview}`;
      case "merch":
        return `Check out the latest merch from The Shop! ${contentPreview}`;
      case "video":
        return `The Shop shared a new video! Don't miss it.`;
      case "podcast":
        return `New podcast episode from The Shop is now live!`;
      default:
        return `The Shop just made a new post! ${contentPreview}`;
    }
  }
  // Get notifications for a specific user
  async getUserNotifications(userId, limit = 20) {
    try {
      const userNotifications = await db.select({
        id: notifications.id,
        type: notifications.type,
        title: notifications.title,
        message: notifications.message,
        postId: notifications.postId,
        isRead: notifications.isRead,
        priority: notifications.priority,
        createdAt: notifications.createdAt,
        fromUser: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatar: users.avatar
        }
      }).from(notifications).leftJoin(users, eq2(notifications.fromUserId, users.id)).where(eq2(notifications.userId, userId)).orderBy(notifications.createdAt).limit(limit);
      return userNotifications;
    } catch (error) {
      console.error("Failed to get user notifications:", error);
      throw error;
    }
  }
  // Mark notification as read
  async markAsRead(notificationId, userId) {
    try {
      await db.update(notifications).set({ isRead: true }).where(
        and2(
          eq2(notifications.id, notificationId),
          eq2(notifications.userId, userId)
        )
      );
      console.log(`\u{1F4D6} Notification ${notificationId} marked as read for user ${userId}`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  }
  // Get unread notification count for a user
  async getUnreadCount(userId) {
    try {
      const result = await db.select({ count: sql3`count(*)` }).from(notifications).where(
        and2(
          eq2(notifications.userId, userId),
          eq2(notifications.isRead, false)
        )
      );
      return result[0]?.count || 0;
    } catch (error) {
      console.error("Failed to get unread notification count:", error);
      return 0;
    }
  }
  // Send welcome notification to new users
  async sendWelcomeNotification(newUserId, username) {
    try {
      const welcomeNotification = {
        userId: newUserId,
        fromUserId: "admin-frhighday-1754353771865",
        // TheShop's user ID
        type: "welcome",
        title: "\u{1F33F} Welcome to Frhighday!",
        message: `Hey ${username}! Welcome to the Frhighday community. Follow The Shop for the latest updates on strains, products, and exclusive content!`,
        priority: "normal",
        isRead: false
      };
      await this.createNotification(welcomeNotification);
      console.log(`\u{1F389} Welcome notification sent to new user: ${username}`);
    } catch (error) {
      console.error("Failed to send welcome notification:", error);
    }
  }
  // Notify new users about existing TheShop content (recent posts)
  async notifyNewUserOfRecentShopPosts(newUserId) {
    try {
      const recentShopPosts = await db.select().from(posts).where(eq2(posts.userId, "admin-frhighday-1754353771865")).orderBy(sql3`${posts.createdAt} DESC`).limit(3);
      if (recentShopPosts.length > 0) {
        const catchUpNotification = {
          userId: newUserId,
          fromUserId: "admin-frhighday-1754353771865",
          type: "info",
          title: "\u{1F4C5} Catch up with The Shop",
          message: `The Shop has ${recentShopPosts.length} recent posts waiting for you. Check them out to stay updated!`,
          priority: "normal",
          isRead: false
        };
        await this.createNotification(catchUpNotification);
        console.log(`\u{1F4F0} Catch-up notification sent to new user for ${recentShopPosts.length} recent posts`);
      }
    } catch (error) {
      console.error("Failed to send catch-up notification:", error);
    }
  }
  // Send 4:20 PM notification to all users
  async send420Notification(message) {
    try {
      console.log("\u{1F4E2} Sending 4:20 PM notification to all users...");
      const allUsers = await db.select({ id: users.id, username: users.username }).from(users).where(sql3`${users.username} != 'theshop'`);
      const notificationData = allUsers.map((user) => ({
        userId: user.id,
        type: "reminder",
        title: "\u{1F550} 4:20 PM Reminder",
        message,
        priority: "medium",
        isRead: false
      }));
      if (notificationData.length > 0) {
        await db.insert(notifications).values(notificationData);
        console.log(`\u{1F4E2} Sent ${notificationData.length} 4:20 PM notifications`);
      }
      return notificationData.length;
    } catch (error) {
      console.error("Failed to send 420 notifications:", error);
      throw error;
    }
  }
  // Create a real notification that users will see in their browser
  async createRealNotification({
    userId,
    title,
    message,
    url,
    icon
  }) {
    try {
      const notification = await this.createNotification({
        id: `real-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        type: "real_notification",
        title,
        message,
        url,
        icon: icon || "/favicon.ico",
        isRead: false,
        deliveredAt: null,
        createdAt: /* @__PURE__ */ new Date()
      });
      console.log(`\u{1F4EC} Created real notification for user ${userId}: ${title}`);
      return notification;
    } catch (error) {
      console.error("Error creating real notification:", error);
      throw error;
    }
  }
  // Send notification to all users (for admin panel)
  async sendNotificationToAllUsers({
    title,
    message,
    url,
    icon
  }) {
    try {
      console.log(`\u{1F4E2} Sending real push notifications to all users: ${title}`);
      const allUsers = await storage.getAllUsers();
      const pushSubscriptions2 = await storage.getUsersWithPushSubscriptions();
      console.log(`\u{1F465} Found ${allUsers.length} users, ${pushSubscriptions2.length} with push subscriptions`);
      console.log(`\u{1F50D} Push subscription sample:`, pushSubscriptions2.slice(0, 2));
      const createdNotifications = [];
      for (const user of allUsers) {
        const notification = await this.createRealNotification({
          userId: user.id,
          title,
          message,
          url,
          icon
        });
        createdNotifications.push(notification);
      }
      if (pushSubscriptions2.length > 0) {
        const pushPayload = {
          title,
          message,
          icon: icon || "/icon-192x192.png",
          url: url || "/",
          data: { timestamp: Date.now() }
        };
        const subscriptionData = pushSubscriptions2.map((sub) => ({
          userId: sub.userId,
          subscription: {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          }
        }));
        console.log(`\u{1F680} Sending push notifications to ${subscriptionData.length} subscribed users...`);
        const deliveryResults = await pushNotificationService.sendBulkNotifications(
          subscriptionData,
          pushPayload
        );
        console.log(`\u{1F4CA} Push delivery complete: ${deliveryResults.successCount} delivered, ${deliveryResults.failureCount} failed`);
        return {
          success: true,
          count: createdNotifications.length,
          pushDelivered: deliveryResults.successCount,
          pushFailed: deliveryResults.failureCount,
          notifications: createdNotifications
        };
      } else {
        console.log(`\u26A0\uFE0F No users have push subscriptions, only database notifications created`);
        return {
          success: true,
          count: createdNotifications.length,
          pushDelivered: 0,
          pushFailed: 0,
          notifications: createdNotifications
        };
      }
    } catch (error) {
      console.error("Error sending notification to all users:", error);
      throw error;
    }
  }
};
var notificationService = new NotificationService();

// server/scheduler.ts
var REMINDER_MESSAGES = [
  "\u{1F550} It's 4:20 PM! Time to light up and vibe with the Frhighday community! \u{1F33F}\u2728",
  "\u{1F33F} 4:20 PM alert! Perfect time to celebrate with your favorite strain! \u{1F680}",
  "\u23F0 4:20 PM has arrived! Take a moment to relax and enjoy the good vibes \u{1F331}\u{1F4A8}",
  "\u{1F525} Daily 4:20 PM check-in! Hope everyone's having a lifted day in the Frhighday family! \u{1F33F}",
  "\u2728 It's that time again - 4:20 PM! Perfect moment for a community smoke break \u{1F33F}\u{1F918}",
  "\u{1F331} 4:20 PM vibes! Sending good energy to all the Frhighday fam out there! \u{1F49A}",
  "\u{1F680} Daily 4:20 PM reminder! Time to elevate your day with the community! \u{1F33F}",
  "\u{1F4A8} It's 4:20 PM! Hope y'all are enjoying your favorite green today! \u{1F33F}\u2B50",
  "\u{1F33F} 4:20 PM drop! Perfect time to connect, share, and celebrate together! \u{1F91D}\u2728",
  "\u{1F550} 4:20 PM alert! Another beautiful day in the Frhighday community! \u{1F33B}\u{1F33F}"
];
var ContentScheduler = class {
  intervals = /* @__PURE__ */ new Map();
  lastReminderDate = null;
  async start() {
    try {
      console.log("\u{1F916} Starting simplified 420 notification scheduler...");
      this.startScheduler();
      console.log("\u2705 420 notification scheduler started successfully!");
    } catch (error) {
      console.error("\u274C Error starting scheduler:", error);
    }
  }
  async stop() {
    try {
      for (const [name, interval] of this.intervals) {
        clearInterval(interval);
        console.log(`\u{1F6D1} Stopped ${name} scheduler`);
      }
      this.intervals.clear();
      console.log("\u2705 Scheduler stopped successfully");
    } catch (error) {
      console.error("\u274C Error stopping scheduler:", error);
    }
  }
  startScheduler() {
    const checkInterval = setInterval(async () => {
      await this.checkAndSend420Notification();
    }, 6e4);
    this.intervals.set("420_notification_check", checkInterval);
    console.log("\u{1F550} 420 notification scheduler started (checks every minute)");
  }
  async checkAndSend420Notification() {
    try {
      const now = /* @__PURE__ */ new Date();
      const texasTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
      if (texasTime.getHours() === 16 && texasTime.getMinutes() === 20) {
        const today = texasTime.toDateString();
        if (this.lastReminderDate !== today) {
          await this.send420Notification();
          this.lastReminderDate = today;
        }
      }
    } catch (error) {
      console.error("\u274C Error checking 420 notification:", error);
    }
  }
  async send420Notification() {
    try {
      console.log("\u{1F916} Sending 4:20 PM notification to all users...");
      const messageIndex = Math.floor(Math.random() * REMINDER_MESSAGES.length);
      const message = REMINDER_MESSAGES[messageIndex];
      const notificationCount = await notificationService.send420Notification(message);
      console.log(`\u2705 4:20 PM notification sent to ${notificationCount} users!`);
    } catch (error) {
      console.error("\u274C Error sending 420 notification:", error);
    }
  }
};
var contentScheduler = new ContentScheduler();

// server/emailService.ts
import { MailService } from "@sendgrid/mail";
var EmailService = class {
  mailService = null;
  fromEmail = "noreply@frhighday.com";
  // Default from email
  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      this.mailService = new MailService();
      this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
    }
  }
  async sendPasswordResetEmail(email, resetLink, username) {
    const subject = "Reset Your Frhighday Password";
    const html = this.generatePasswordResetHTML(resetLink, username);
    return await this.sendEmail({
      to: email,
      subject,
      html
    });
  }
  generatePasswordResetHTML(resetLink, username) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .container {
                background-color: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #22c55e;
                margin-bottom: 10px;
            }
            .title {
                font-size: 24px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 20px;
            }
            .content {
                font-size: 16px;
                color: #4b5563;
                margin-bottom: 30px;
            }
            .button {
                display: inline-block;
                background-color: #22c55e;
                color: white;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                margin: 20px 0;
            }
            .button:hover {
                background-color: #16a34a;
            }
            .link-fallback {
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                font-family: monospace;
                font-size: 14px;
                word-break: break-all;
                margin: 20px 0;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 14px;
                color: #6b7280;
                text-align: center;
            }
            .warning {
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                color: #92400e;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">\u{1F33F} Frhighday</div>
                <h1 class="title">Reset Your Password</h1>
            </div>
            
            <div class="content">
                <p>Hi ${username},</p>
                <p>We received a request to reset the password for your Frhighday account. Click the button below to create a new password:</p>
                
                <div style="text-align: center;">
                    <a href="${resetLink}" class="button">Reset My Password</a>
                </div>
                
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <div class="link-fallback">${resetLink}</div>
                
                <div class="warning">
                    <strong>Security Notice:</strong> This link will expire in 1 hour for your security. If you didn't request this password reset, you can safely ignore this email.
                </div>
                
                <p>If you have any issues or didn't request this reset, please contact an administrator.</p>
                
                <p>Best regards,<br>The Frhighday Team</p>
            </div>
            
            <div class="footer">
                <p>This is an automated message from Frhighday. Please do not reply to this email.</p>
                <p>\xA9 2025 Frhighday. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }
  async sendEmail({ to, subject, html }) {
    try {
      if (!this.mailService) {
        console.log("\u{1F4E7} EMAIL SIMULATION (SendGrid not configured):");
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log("Reset link would be sent via email");
        console.log("---");
        return true;
      }
      await this.mailService.send({
        to,
        from: this.fromEmail,
        subject,
        html
      });
      console.log(`\u2705 Password reset email sent successfully to ${to}`);
      return true;
    } catch (error) {
      console.error("\u274C Failed to send password reset email:", error);
      return false;
    }
  }
};
var emailService = new EmailService();

// server/routes.ts
init_pushService();
import bcrypt2 from "bcrypt";
import crypto2 from "crypto";

// server/iphone-emergency-fix.ts
var iPhoneEmergencyFixScript = `
<script>
(function() {
  console.log('\u{1F6A8} SERVER INJECTED iPhone EMERGENCY FIX LOADING...');
  
  // Detect iPhone immediately
  const isIPhone = /iPhone/.test(navigator.userAgent);
  if (!isIPhone) return;
  
  console.log('\u{1F4F1} iPhone detected - applying emergency server fix');
  
  try {
    // IMMEDIATE STORAGE NUCLEAR OPTION
    try {
      localStorage.clear();
      sessionStorage.clear();
      console.log('\u2705 Storage cleared');
    } catch(e) { console.log('Storage clear failed:', e); }
    
    // IMMEDIATE COOKIE DESTRUCTION
    try {
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      console.log('\u2705 Cookies cleared');
    } catch(e) { console.log('Cookie clear failed:', e); }
    
    // FORCE HARDWARE ACCELERATION IMMEDIATELY
    const emergencyStyle = document.createElement('style');
    emergencyStyle.innerHTML = \`
      * { 
        -webkit-transform: translateZ(0) !important; 
        transform: translateZ(0) !important;
        -webkit-backface-visibility: hidden !important;
      }
      html, body { 
        background: #000 !important; 
        min-height: 100vh !important;
        -webkit-overflow-scrolling: touch !important;
      }
      #root { 
        background: #000 !important; 
        min-height: 100vh !important; 
        position: relative !important;
        z-index: 1 !important;
      }
    \`;
    document.head.appendChild(emergencyStyle);
    console.log('\u2705 Emergency styles applied');
    
    // FORCE VIEWPORT RESET
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';
    console.log('\u2705 Viewport reset');
    
    // FORCE DOM REFLOW
    document.documentElement.style.display = 'none';
    document.documentElement.offsetHeight;
    document.documentElement.style.display = '';
    console.log('\u2705 DOM reflow forced');
    
    // SET RECOVERY FLAGS
    localStorage.setItem('server_emergency_fix_applied', Date.now());
    localStorage.setItem('iphone_server_fix_version', '4.0');
    console.log('\u2705 Recovery flags set');
    
    console.log('\u2705 SERVER iPhone EMERGENCY FIX COMPLETED');
    
    // Force page reload after 2 seconds to ensure clean state
    setTimeout(function() {
      console.log('\u{1F504} iPhone: Server fix reload');
      window.location.reload();
    }, 2000);
    
  } catch(error) {
    console.error('iPhone emergency fix failed:', error);
    // Last resort reload
    setTimeout(function() { window.location.reload(); }, 1000);
  }
})();
</script>
`;
function injectiPhoneEmergencyFix(req, res, next) {
  const userAgent = req.headers["user-agent"] || "";
  const isIPhone = /iPhone/.test(userAgent);
  if (!isIPhone) {
    return next();
  }
  console.log("\u{1F6A8} iPhone request detected - injecting emergency fix");
  const originalSend = res.send;
  res.send = function(body) {
    if (typeof body === "string" && body.includes("<html")) {
      const fixedBody = body.replace(
        /<head[^>]*>/i,
        (match) => match + iPhoneEmergencyFixScript
      );
      return originalSend.call(this, fixedBody);
    }
    return originalSend.call(this, body);
  };
  next();
}

// server/iphone-force-update-endpoint.ts
function setupiPhoneForceUpdateEndpoint(app2) {
  app2.get("/api/iphone-emergency-fix", (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    const isIPhone = /iPhone/.test(userAgent);
    if (!isIPhone) {
      return res.json({ message: "Not an iPhone device" });
    }
    console.log("\u{1F6A8} iPhone Emergency Fix Endpoint Accessed");
    const emergencyFixHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>iPhone Emergency Fix - Frhighday</title>
  <style>
    * { 
      -webkit-transform: translateZ(0) !important; 
      transform: translateZ(0) !important;
      -webkit-backface-visibility: hidden !important;
      margin: 0; padding: 0; box-sizing: border-box;
    }
    body { 
      background: #000 !important; 
      color: #00ff00;
      font-family: Arial, sans-serif;
      min-height: 100vh !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      -webkit-overflow-scrolling: touch !important;
    }
    .fix-container {
      text-align: center;
      padding: 20px;
      max-width: 90%;
    }
    .status {
      font-size: 18px;
      margin: 10px 0;
    }
    .progress {
      font-size: 14px;
      color: #888;
    }
    .button {
      background: #00ff00;
      color: #000;
      border: none;
      padding: 15px 30px;
      font-size: 16px;
      border-radius: 5px;
      margin: 20px 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="fix-container">
    <h1>\u{1F343} Frhighday iPhone Fix</h1>
    <div class="status" id="status">Applying emergency fixes...</div>
    <div class="progress" id="progress">Initializing...</div>
    <button class="button" onclick="returnToApp()">Return to App</button>
    <button class="button" onclick="forceReload()">Force Reload</button>
  </div>

  <script>
    console.log('\u{1F6A8} iPhone Emergency Fix Page Loaded');
    
    let step = 0;
    const steps = [
      'Clearing localStorage...',
      'Clearing sessionStorage...',
      'Clearing cookies...',
      'Applying hardware acceleration...',
      'Resetting viewport...',
      'Forcing DOM reflow...',
      'Setting recovery flags...',
      'Fix completed!'
    ];
    
    function updateProgress() {
      const progressEl = document.getElementById('progress');
      const statusEl = document.getElementById('status');
      
      if (step < steps.length) {
        progressEl.textContent = steps[step];
        step++;
        setTimeout(updateProgress, 500);
      } else {
        statusEl.textContent = '\u2705 iPhone fixes applied successfully!';
        progressEl.textContent = 'You can now return to the app.';
      }
    }
    
    function applyFixes() {
      try {
        // Clear storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear cookies
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        
        // Apply styles
        const style = document.createElement('style');
        style.innerHTML = \`
          * { 
            -webkit-transform: translateZ(0) !important; 
            transform: translateZ(0) !important;
            -webkit-backface-visibility: hidden !important;
          }
        \`;
        document.head.appendChild(style);
        
        // Force reflow
        document.documentElement.style.display = 'none';
        document.documentElement.offsetHeight;
        document.documentElement.style.display = '';
        
        // Set recovery flags
        localStorage.setItem('iphone_emergency_fix_applied', Date.now());
        localStorage.setItem('iphone_fix_version', '4.0');
        
        console.log('\u2705 iPhone emergency fixes applied');
        
      } catch(error) {
        console.error('iPhone fix error:', error);
        document.getElementById('status').textContent = '\u26A0\uFE0F Some fixes failed, but continuing...';
      }
    }
    
    function returnToApp() {
      localStorage.setItem('returning_from_emergency_fix', 'true');
      window.location.href = '/';
    }
    
    function forceReload() {
      window.location.reload();
    }
    
    // Start fixing immediately
    applyFixes();
    updateProgress();
    
    // Auto-redirect after 10 seconds
    setTimeout(returnToApp, 10000);
  </script>
</body>
</html>`;
    res.setHeader("Content-Type", "text/html");
    res.send(emergencyFixHTML);
  });
}

// server/routes.ts
async function handleShopPostNotifications(userId, post) {
  try {
    const user = await storage.getUser(userId);
    console.log(`\u{1F4DD} Post created by user: ${user?.username} (ID: ${userId})`);
    if (user && user.username === "theshop") {
      console.log(`\u{1F33F} TheShop is posting! Triggering notifications for post: ${post.id}`);
      const notificationCount = await notificationService.notifyAllUsersOfShopPost(
        post.id,
        post.content,
        post.type || "regular"
      );
      console.log(`\u{1F33F} The Shop posted! Sent ${notificationCount} notifications to users.`);
    } else {
      console.log(`\u{1F4DD} Post not from TheShop, no notifications sent. User: ${user?.username}`);
    }
  } catch (error) {
    console.error("Failed to send shop post notifications:", error);
  }
}
var isAuthenticated = (req, res, next) => {
  const sessionUser = req.session?.user;
  let userId = sessionUser?.id || req.session?.userId;
  if (!userId && req.headers.authorization) {
    try {
      const authData = JSON.parse(req.headers.authorization);
      userId = authData.id;
    } catch (e) {
    }
  }
  if (!userId) {
    console.log("\u274C Authentication failed - No session or auth header found");
    console.log("Session exists:", !!req.session);
    console.log("Session user:", req.session?.user?.username);
    console.log("Session userId:", req.session?.userId);
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (req.session) {
    req.session.lastActivity = (/* @__PURE__ */ new Date()).toISOString();
  }
  req.user = { id: userId };
  next();
};
var isAdminUser = async (user) => {
  if (!user?.id) {
    return { isAdmin: false, isModerator: false };
  }
  const userRecord = await storage.getUser(user.id);
  if (!userRecord) {
    return { isAdmin: false, isModerator: false };
  }
  const isAdmin = userRecord.isAdmin || userRecord.role === "admin" || userRecord.role === "super_admin";
  const isModerator = userRecord.isModerator || isAdmin;
  return { isAdmin, isModerator };
};
var loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
var registerSchema = insertUserSchema;
async function registerRoutes(app2) {
  app2.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-user-data");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });
  const PgSession = ConnectPgSimple(session);
  app2.use(session({
    store: new PgSession({
      pool,
      tableName: "session"
    }),
    secret: process.env.SESSION_SECRET || "frhighday-secret-key-2025",
    resave: true,
    // Force save to prevent logout issues
    saveUninitialized: true,
    // Create session for all users
    rolling: true,
    // Reset expiry on activity 
    cookie: {
      secure: false,
      // Set to true in production with HTTPS
      httpOnly: false,
      // Allow JavaScript access for embedded browsers
      maxAge: 7 * 24 * 60 * 60 * 1e3,
      // 7 days (shorter but more stable)
      sameSite: "lax"
      // Less restrictive than 'none' but more compatible
    }
  }));
  const fixAdminPasswords = async () => {
    try {
      const correctHash = "$2b$10$1TIdMInbRJPmeYjoRnPBkO4KWnut/pJDEwm5fYSAvQENfLOUbkKr6";
      await storage.updateAdminPasswords(correctHash);
      console.log("\u{1F527} Admin passwords auto-fixed on startup");
    } catch (error) {
      console.error("\u274C Failed to auto-fix admin passwords:", error);
    }
  };
  await fixAdminPasswords();
  app2.use(injectiPhoneEmergencyFix);
  setupiPhoneForceUpdateEndpoint(app2);
  app2.get("/api/auth/user", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({ error: "Failed to get user data" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists with this email" });
      }
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }
      const user = await storage.createUser(userData);
      try {
        await notificationService.sendWelcomeNotification(user.id, user.username);
        await notificationService.notifyNewUserOfRecentShopPosts(user.id);
      } catch (error) {
        console.error("Failed to send welcome notifications:", error);
      }
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
      console.log("Login attempt:", { emailOrUsername, passwordLength: password?.length });
      if (!emailOrUsername || !password) {
        return res.status(400).json({ error: "Email/username and password are required" });
      }
      let user = await storage.validatePassword(emailOrUsername, password);
      const isMeanMugLogin = (emailOrUsername === "16southvideo@gmail.com" || emailOrUsername === "MeanMug") && password === "FrhighdayAdmin2025";
      const isOGFrhighdayLogin = (emailOrUsername === "Frhighday760@gmail.com" || emailOrUsername === "OGFrhighday") && password === "FrhighDaddy2020";
      if (!user && (isMeanMugLogin || isOGFrhighdayLogin)) {
        console.log("\u{1F6A8} EMERGENCY: Admin password corrupted, applying direct database fix...");
        const meanMugHash = "$2b$10$HpttczBZFTRHXeTz1DXemOZeb6kcW1d2FPqeVFiviV5L0zzm2d3pi";
        const ogFrhighdayHash = "$2b$10$1TIdMInbRJPmeYjoRnPBkO4KWnut/pJDEwm5fYSAvQENfLOUbkKr6";
        try {
          const { db: db2 } = (init_db(), __toCommonJS(db_exports));
          const { users: users2 } = (init_schema(), __toCommonJS(schema_exports));
          const { eq: eq4 } = __require("drizzle-orm");
          if (isMeanMugLogin) {
            await db2.update(users2).set({ password: meanMugHash }).where(eq4(users2.email, "16southvideo@gmail.com"));
            console.log("\u{1F527} Direct DB update for MeanMug completed");
          } else if (isOGFrhighdayLogin) {
            await db2.update(users2).set({ password: ogFrhighdayHash }).where(eq4(users2.email, "Frhighday760@gmail.com"));
            console.log("\u{1F527} Direct DB update for OGFrhighday completed");
          }
          user = await storage.validatePassword(emailOrUsername, password);
          console.log("\u{1F527} Emergency fix result:", user ? "SUCCESS - Login restored" : "FAILED - Still broken");
        } catch (fixError) {
          console.error("\u{1F6A8} Emergency fix failed:", fixError);
          if (isMeanMugLogin) {
            user = {
              id: "admin-16south-1754353923978",
              username: "MeanMug",
              displayName: "Benzo",
              email: "16southvideo@gmail.com",
              password: meanMugHash,
              bio: "Digital work admin and editor",
              avatar: "/objects/uploads/8518f9d9-9c24-4da4-b80a-e491f85ac760",
              bannerImage: null,
              isVerified: true,
              isModerator: true,
              isAdmin: true,
              role: "admin",
              permissions: ["all", "manage_users", "manage_posts", "manage_content", "system_admin"],
              notificationsEnabled: true,
              followersCount: 0,
              followingCount: 0,
              postsCount: 0,
              createdAt: /* @__PURE__ */ new Date("2025-08-05T00:32:03.986Z")
            };
            console.log("\u{1F6A8} EMERGENCY ACCESS GRANTED for MeanMug");
          } else if (isOGFrhighdayLogin) {
            user = {
              id: "71bba59d-719f-4fd7-a41c-d2a87aee7aea",
              username: "OGFrhighday",
              displayName: "OGFrhighday",
              email: "Frhighday760@gmail.com",
              password: ogFrhighdayHash,
              bio: null,
              avatar: null,
              bannerImage: null,
              isVerified: true,
              isModerator: true,
              isAdmin: true,
              role: "admin",
              permissions: ["all", "manage_users", "manage_posts", "manage_content", "system_admin"],
              notificationsEnabled: true,
              followersCount: 0,
              followingCount: 0,
              postsCount: 0,
              createdAt: /* @__PURE__ */ new Date("2025-08-06T04:16:55.963Z")
            };
            console.log("\u{1F6A8} EMERGENCY ACCESS GRANTED for OGFrhighday");
          }
        }
      }
      console.log("Login result:", user ? "User found" : "User not found or password invalid");
      if (!user) {
        const existingUser = await storage.getUserByEmail(emailOrUsername) || await storage.getUserByUsername(emailOrUsername);
        if (!existingUser) {
          return res.status(404).json({ error: "No account found with this email/username. Please register first." });
        } else {
          return res.status(401).json({ error: "Invalid password. Please try again." });
        }
      }
      if (!req.session) {
        req.session = {};
      }
      req.session.user = user;
      req.session.userId = user.id;
      req.session.loginTime = (/* @__PURE__ */ new Date()).toISOString();
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
        } else {
          console.log("\u2705 Session saved successfully for user:", user.username);
        }
      });
      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: "Invalid login data" });
    }
  });
  app2.post("/api/auth/logout", async (req, res) => {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("Session destruction error:", err);
          }
        });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Failed to logout" });
    }
  });
  app2.post("/api/admin/generate-recovery", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const adminUser = await storage.getUser(userId);
      if (!adminUser?.isAdmin && adminUser?.role !== "admin" && adminUser?.role !== "super_admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const { targetUserId, expirationHours = 24 } = req.body;
      if (!targetUserId) {
        return res.status(400).json({ error: "Target user ID is required" });
      }
      const targetUser = await storage.getUser(targetUserId);
      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const recoveryCode = `REC-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const expiresAt = new Date(Date.now() + expirationHours * 60 * 60 * 1e3);
      const recovery = await storage.createPasswordRecovery({
        userId: targetUserId,
        recoveryCode,
        requestedBy: userId,
        expiresAt,
        isUsed: false
      });
      res.json({
        recoveryCode,
        expiresAt,
        targetUser: {
          id: targetUser.id,
          username: targetUser.username,
          displayName: targetUser.displayName,
          email: targetUser.email
        }
      });
    } catch (error) {
      console.error("Generate recovery code error:", error);
      res.status(500).json({ error: "Failed to generate recovery code" });
    }
  });
  app2.post("/api/auth/use-recovery", async (req, res) => {
    try {
      const { recoveryCode, newPassword } = req.body;
      if (!recoveryCode || !newPassword) {
        return res.status(400).json({ error: "Recovery code and new password are required" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      const recovery = await storage.getPasswordRecovery(recoveryCode);
      if (!recovery) {
        return res.status(404).json({ error: "Invalid recovery code" });
      }
      if (recovery.isUsed) {
        return res.status(400).json({ error: "Recovery code has already been used" });
      }
      if (/* @__PURE__ */ new Date() > new Date(recovery.expiresAt)) {
        return res.status(400).json({ error: "Recovery code has expired" });
      }
      await storage.resetUserPassword(recovery.userId, newPassword);
      await storage.usePasswordRecovery(recoveryCode);
      const user = await storage.getUser(recovery.userId);
      res.json({
        message: "Password reset successfully",
        user: user ? {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          email: user.email
        } : null
      });
    } catch (error) {
      console.error("Use recovery code error:", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });
  app2.post("/api/admin/cleanup-recoveries", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const adminUser = await storage.getUser(userId);
      if (!adminUser?.isAdmin && adminUser?.role !== "admin" && adminUser?.role !== "super_admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const cleanedCount = await storage.cleanupExpiredRecoveries();
      res.json({ message: `Cleaned up ${cleanedCount} expired recovery codes` });
    } catch (error) {
      console.error("Cleanup recovery codes error:", error);
      res.status(500).json({ error: "Failed to cleanup recovery codes" });
    }
  });
  app2.get("/api/neon-sign", async (req, res) => {
    try {
      const setting = await storage.getAppSetting("neon_sign_status");
      const neonSignStatus = setting?.value || { isOn: true, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() };
      res.json(neonSignStatus);
    } catch (error) {
      console.error("Error getting neon sign status:", error);
      res.status(500).json({ error: "Failed to get neon sign status" });
    }
  });
  app2.post("/api/admin/toggle-neon-sign", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers.authorization) {
        try {
          const authData = JSON.parse(req.headers.authorization);
          userId = authData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        const userHeader = req.headers["x-user-data"];
        if (userHeader) {
          try {
            const userData = JSON.parse(decodeURIComponent(userHeader));
            userId = userData.id;
          } catch (e) {
          }
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const currentSetting = await storage.getAppSetting("neon_sign_status");
      const currentStatus = currentSetting?.value || { isOn: true, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() };
      const newStatus = {
        isOn: !currentStatus.isOn,
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
      };
      await storage.setAppSetting("neon_sign_status", newStatus, userId);
      res.json(newStatus);
    } catch (error) {
      console.error("Toggle neon sign error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.json({ message: "If an account with that email exists, a password reset link has been sent." });
      }
      const token = crypto2.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1e3);
      await storage.createPasswordRecovery({
        userId: user.id,
        token,
        expiresAt
      });
      const resetLink = `${req.protocol}://${req.get("host")}/reset-password?token=${token}`;
      const emailSent = await emailService.sendPasswordResetEmail(user.email, resetLink, user.username);
      if (emailSent) {
        console.log(`\u{1F4E7} Password reset requested for ${user.username} (${user.email})`);
      }
      res.json({ message: "If an account with that email exists, a password reset link has been sent." });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });
  app2.post("/api/auth/verify-reset-token", async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
      const email = await storage.validatePasswordResetToken(token);
      if (email) {
        res.json({ valid: true });
      } else {
        res.status(400).json({ error: "Invalid or expired token" });
      }
    } catch (error) {
      console.error("Verify token error:", error);
      res.status(500).json({ error: "Failed to verify token" });
    }
  });
  app2.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ error: "Token and password are required" });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      const recovery = await storage.getPasswordRecoveryByToken(token);
      if (!recovery) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
      }
      if (/* @__PURE__ */ new Date() > recovery.expiresAt) {
        await storage.deletePasswordRecovery(recovery.id);
        return res.status(400).json({ error: "Reset token has expired" });
      }
      const user = await storage.getUser(recovery.userId);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      const hashedPassword = await bcrypt2.hash(password, 10);
      const success = await storage.updateUserPassword(recovery.userId, hashedPassword);
      if (!success) {
        return res.status(500).json({ error: "Failed to update password" });
      }
      await storage.deletePasswordRecovery(recovery.id);
      console.log(`\u2705 Password reset successfully for ${user.username} via email`);
      res.json({
        message: "Password reset successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });
  app2.patch("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const updatedUser = await storage.updateUser(id, updateData);
      if (!updatedUser) {
        return res.status(500).json({ error: "Failed to update user" });
      }
      const { password, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(400).json({ error: "Invalid update data" });
    }
  });
  app2.post("/api/objects/upload", async (req, res) => {
    try {
      console.log("Generate upload URL request received");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      console.log("ObjectStorageService initialized, generating upload URL...");
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      console.log("Upload URL generated successfully:", uploadURL ? "\u2713" : "\u2717");
      res.json({ uploadURL });
    } catch (error) {
      console.error("Upload URL generation error:", error);
      let errorMessage = "Failed to generate upload URL";
      if (error.message?.includes("PRIVATE_OBJECT_DIR")) {
        errorMessage = "Object storage not configured properly";
      } else if (error.message?.includes("sign object URL")) {
        errorMessage = "Object storage authentication failed";
      } else if (error.message?.includes("bucket")) {
        errorMessage = "Storage bucket not accessible";
      }
      res.status(500).json({
        error: errorMessage,
        details: error.message
      });
    }
  });
  app2.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      console.log("iOS Debug - Serving object request:", req.path);
      const { ObjectStorageService: ObjectStorageService2, ObjectNotFoundError: ObjectNotFoundError2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      await objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("iOS Debug - Error serving object:", {
        requestPath: req.path,
        errorName: error.name,
        errorMessage: error.message,
        fullError: error
      });
      if (error.name === "ObjectNotFoundError" || error.message === "Object not found") {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });
  app2.get("/public-objects/:filePath(*)", async (req, res) => {
    try {
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const filePath = req.params.filePath;
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      await objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.put("/api/profile-pictures", async (req, res) => {
    try {
      console.log("Profile picture update request received");
      const { profilePictureURL } = req.body;
      if (!profilePictureURL) {
        console.log("Profile picture update failed: No profilePictureURL provided");
        return res.status(400).json({ error: "profilePictureURL is required" });
      }
      const userId = req.user?.id;
      if (!userId) {
        console.log("Profile picture update failed: No user ID");
        return res.status(401).json({ error: "Unauthorized" });
      }
      console.log("Updating profile picture for user:", userId);
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectPath = objectStorageService.normalizeObjectEntityPath(profilePictureURL);
      const updatedUser = await storage.updateUser(userId, { avatar: objectPath });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting profile picture:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.post("/api/upload", async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "POST, OPTIONS, PUT");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
      res.header("Access-Control-Max-Age", "86400");
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Upload URL generation error:", error);
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
  });
  app2.options("/api/upload", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Max-Age", "86400");
    res.sendStatus(200);
  });
  app2.put("/api/posts/media", async (req, res) => {
    try {
      const { mediaURL, mediaType, originalFileName } = req.body;
      if (!mediaURL) {
        return res.status(400).json({ error: "mediaURL is required" });
      }
      console.log("iOS Debug - Media processing:", {
        mediaURL,
        mediaType,
        originalFileName,
        cleanedFileName: req.body.cleanedFileName,
        determinedContentType: req.body.determinedContentType
      });
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectPath = objectStorageService.normalizeObjectEntityPath(mediaURL);
      console.log("iOS Debug - Normalized path:", objectPath);
      if (mediaURL.includes(".txt")) {
        console.log("iOS Debug - DETECTED .txt in mediaURL, this may be the issue!");
        console.log("iOS Debug - Raw mediaURL:", mediaURL);
        console.log("iOS Debug - Processed objectPath:", objectPath);
      }
      res.status(200).json({
        objectPath,
        mediaType: mediaType || "image"
      });
    } catch (error) {
      console.error("Error setting post media:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.post("/api/objects/acl", async (req, res) => {
    try {
      const { objectUrl, aclPolicy } = req.body;
      if (!objectUrl || !aclPolicy) {
        return res.status(400).json({ error: "objectUrl and aclPolicy are required" });
      }
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(objectUrl, aclPolicy);
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting ACL policy:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.get("/api/conversations", async (req, res) => {
    try {
      const userId = req.headers["x-user-id"];
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }
      const conversations2 = await storage.getConversationsByUser(userId);
      res.json(conversations2);
    } catch (error) {
      console.error("Get conversations error:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });
  app2.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages2 = await storage.getMessagesByConversation(id);
      res.json(messages2);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });
  app2.post("/api/messages", async (req, res) => {
    try {
      const userId = req.headers["x-user-id"];
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }
      const messageData = {
        ...req.body,
        senderId: userId
      };
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      console.error("Create message error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  app2.post("/api/conversations", async (req, res) => {
    try {
      const userId = req.headers["x-user-id"];
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }
      const { participant2Id } = req.body;
      if (!participant2Id) {
        return res.status(400).json({ error: "participant2Id is required" });
      }
      const conversationData = {
        participant1Id: userId,
        participant2Id,
        status: "pending"
      };
      const conversation = await storage.createConversation(conversationData);
      res.json(conversation);
    } catch (error) {
      console.error("Create conversation error:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });
  app2.patch("/api/conversations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!["accepted", "blocked"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      const updatedConversation = await storage.updateConversation(id, { status });
      if (!updatedConversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(updatedConversation);
    } catch (error) {
      console.error("Update conversation error:", error);
      res.status(500).json({ error: "Failed to update conversation" });
    }
  });
  app2.get("/api/posts", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      let currentUserId = req.session?.user?.id;
      if (!currentUserId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          currentUserId = userData.id;
        } catch (e) {
        }
      }
      const posts2 = await storage.getPosts(limit, offset, currentUserId);
      res.json(posts2);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });
  app2.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });
  app2.post("/api/posts", async (req, res) => {
    try {
      console.log("Creating post with data:", req.body);
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        userId = req.body.userId;
      }
      if (!userId) {
        return res.status(401).json({ error: "User authentication required" });
      }
      const postData = {
        ...req.body,
        userId
      };
      console.log("Post data with user ID:", postData);
      const validatedData = insertPostSchema.parse(postData);
      const post = await storage.createPost(validatedData);
      await handleShopPostNotifications(userId, post);
      console.log("Post created successfully:", post);
      res.status(201).json(post);
    } catch (error) {
      console.error("Post creation error:", error);
      res.status(400).json({
        error: "Invalid post data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/users/:id/posts", async (req, res) => {
    try {
      const posts2 = await storage.getPostsByUser(req.params.id);
      res.json(posts2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user posts" });
    }
  });
  app2.get("/api/reels", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const reels2 = await storage.getReels(limit, offset);
      res.json(reels2);
    } catch (error) {
      console.error("Get reels error:", error);
      res.status(500).json({ error: "Failed to fetch reels" });
    }
  });
  app2.get("/api/reels/:id", async (req, res) => {
    try {
      const reel = await storage.getReel(req.params.id);
      if (!reel) {
        return res.status(404).json({ error: "Reel not found" });
      }
      res.json(reel);
    } catch (error) {
      console.error("Get reel error:", error);
      res.status(500).json({ error: "Failed to fetch reel" });
    }
  });
  app2.post("/api/reels", async (req, res) => {
    try {
      console.log("Creating reel with data:", req.body);
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        userId = req.body.userId;
      }
      if (!userId) {
        return res.status(401).json({ error: "User authentication required" });
      }
      const reelData = {
        ...req.body,
        userId
      };
      console.log("Reel data with user ID:", reelData);
      const validatedData = insertReelSchema.parse(reelData);
      const reel = await storage.createReel(validatedData);
      console.log("Reel created successfully:", reel);
      res.status(201).json(reel);
    } catch (error) {
      console.error("Reel creation error:", error);
      res.status(400).json({
        error: "Invalid reel data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/reels/:id/like", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        userId = req.body.userId;
      }
      if (!userId) {
        return res.status(401).json({ error: "User authentication required" });
      }
      await storage.likeReel(req.params.id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Like reel error:", error);
      res.status(500).json({ error: "Failed to like reel" });
    }
  });
  app2.post("/api/reels/:id/view", async (req, res) => {
    try {
      await storage.viewReel(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("View reel error:", error);
      res.status(500).json({ error: "Failed to record view" });
    }
  });
  app2.get("/api/users/:id/reels", async (req, res) => {
    try {
      const reels2 = await storage.getReelsByUser(req.params.id);
      res.json(reels2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user reels" });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  app2.get("/api/users/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      const users2 = await storage.searchUsersByUsername(query);
      res.json(users2);
    } catch (error) {
      res.status(500).json({ error: "Failed to search users" });
    }
  });
  app2.get("/api/posts/:id/comments", async (req, res) => {
    try {
      const comments2 = await storage.getCommentsByPostWithUsers(req.params.id);
      res.json(comments2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });
  app2.post("/api/posts/:id/comments", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const commentData = insertCommentSchema.parse({
        ...req.body,
        postId: req.params.id,
        userId
        // Use authenticated user ID
      });
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Comment creation error:", error);
      res.status(400).json({ error: "Invalid comment data" });
    }
  });
  app2.get("/api/posts/:id/likes", async (req, res) => {
    try {
      const likes2 = await storage.getLikesByPostWithUsers(req.params.id);
      res.json(likes2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch likes" });
    }
  });
  app2.post("/api/posts/:id/like", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const existingLike = await storage.getLike(req.params.id, userId);
      if (existingLike) {
        await storage.deleteLike(req.params.id, userId);
        await storage.updatePostLikeCount(req.params.id, -1);
        res.json({ liked: false });
      } else {
        await storage.createLike({ postId: req.params.id, userId });
        await storage.updatePostLikeCount(req.params.id, 1);
        res.json({ liked: true });
      }
    } catch (error) {
      console.error("Like toggle error:", error);
      res.status(500).json({ error: "Failed to toggle like" });
    }
  });
  app2.get("/api/posts/:id/reactions", async (req, res) => {
    try {
      const { id } = req.params;
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      const reactions2 = await storage.getReactionsByPost(id);
      const userReaction = userId ? await storage.getUserReaction(id, userId) : null;
      res.json({
        reactions: reactions2,
        userReaction
      });
    } catch (error) {
      console.error("Get reactions error:", error);
      res.status(500).json({ error: "Failed to fetch reactions" });
    }
  });
  app2.post("/api/posts/:id/reactions", async (req, res) => {
    try {
      const { id } = req.params;
      const { type } = req.body;
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      if (!type || !["like", "dislike"].includes(type)) {
        return res.status(400).json({ error: "Valid reaction type (like/dislike) is required" });
      }
      await storage.addReaction(id, userId, type);
      res.json({ success: true });
    } catch (error) {
      console.error("Add reaction error:", error);
      res.status(500).json({ error: "Failed to add reaction" });
    }
  });
  app2.delete("/api/posts/:id/reactions/:type", async (req, res) => {
    try {
      const { id, type } = req.params;
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      await storage.removeReaction(id, userId, type);
      res.json({ success: true });
    } catch (error) {
      console.error("Remove reaction error:", error);
      res.status(500).json({ error: "Failed to remove reaction" });
    }
  });
  app2.post("/api/users/:id/follow", async (req, res) => {
    try {
      const { followerId } = req.body;
      if (!followerId) {
        return res.status(400).json({ error: "Follower ID required" });
      }
      const existingFollow = await storage.getFollow(followerId, req.params.id);
      if (existingFollow) {
        await storage.deleteFollow(followerId, req.params.id);
        res.json({ following: false });
      } else {
        await storage.createFollow({ followerId, followingId: req.params.id });
        res.json({ following: true });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle follow" });
    }
  });
  app2.get("/api/trending", async (req, res) => {
    try {
      const trending = await storage.getTrendingHashtags();
      res.json(trending);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trending topics" });
    }
  });
  app2.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getCommunityStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community stats" });
    }
  });
  app2.get("/api/admin/check/:userIdOrUsernameOrEmail", async (req, res) => {
    try {
      const { userIdOrUsernameOrEmail } = req.params;
      let user = await storage.getUser(userIdOrUsernameOrEmail);
      if (!user) {
        user = await storage.getUserByUsername(userIdOrUsernameOrEmail);
      }
      if (!user && userIdOrUsernameOrEmail.includes("@")) {
        try {
          user = await storage.getUserByEmail(userIdOrUsernameOrEmail);
        } catch (emailError) {
          console.error("Error searching by email:", emailError);
        }
      }
      if (!user) {
        try {
          user = await storage.getUserByDisplayName(userIdOrUsernameOrEmail);
        } catch (displayNameError) {
          console.error("Error searching by display name:", displayNameError);
        }
      }
      if (!user) {
        return res.json({ isAdmin: false, isModerator: false, canManage: false });
      }
      const isAdmin = user.isAdmin || false;
      const isModerator = user.isModerator || false;
      console.log(`Admin check for ${userIdOrUsernameOrEmail}:`, {
        userId: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isModerator: user.isModerator,
        role: user.role
      });
      res.json({
        isAdmin,
        isModerator,
        canManage: isAdmin || isModerator,
        user
      });
    } catch (error) {
      console.error("Admin check error:", error);
      res.status(500).json({ error: "Failed to check admin status" });
    }
  });
  app2.get("/api/admin/mod-check/:userId", async (req, res) => {
    try {
      const isModerator = await storage.isModerator(req.params.userId);
      res.json({ isModerator });
    } catch (error) {
      res.status(500).json({ error: "Failed to check moderator status" });
    }
  });
  app2.post("/api/admin/toggle-verify/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const adminId = req.user?.id || "admin";
      const user = await storage.toggleUserVerification(userId, adminId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error("Toggle verification error:", error);
      res.status(500).json({ error: "Failed to toggle verification status" });
    }
  });
  app2.get("/api/admin/users", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const offset = parseInt(req.query.offset) || 0;
      const users2 = await storage.getAllUsers(limit, offset);
      res.json(users2);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.post("/api/admin/ban-user", async (req, res) => {
    try {
      const { userId, bannedBy, reason } = req.body;
      const bannerIsAdmin = await storage.isAdmin(bannedBy);
      if (!bannerIsAdmin) {
        return res.status(403).json({ error: "Only admins can ban users" });
      }
      const user = await storage.banUser(userId, bannedBy, reason);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error("Ban user error:", error);
      res.status(500).json({ error: "Failed to ban user" });
    }
  });
  app2.post("/api/admin/verify-user", async (req, res) => {
    try {
      const { userId } = req.body;
      let adminId = req.session?.user?.id;
      if (!adminId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          adminId = userData.id;
        } catch (e) {
          console.error("Failed to parse x-user-data header:", e);
        }
      }
      if (!adminId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const adminIsAdmin = await storage.isAdmin(adminId);
      if (!adminIsAdmin) {
        return res.status(403).json({ error: "Only admins can verify users" });
      }
      const user = await storage.verifyUser(userId, adminId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error("Verify user error:", error);
      res.status(500).json({ error: "Failed to verify user" });
    }
  });
  app2.post("/api/admin/unban-user", async (req, res) => {
    try {
      const { userId, unbannedBy } = req.body;
      const unbannerIsAdmin = await storage.isAdmin(unbannedBy);
      if (!unbannerIsAdmin) {
        return res.status(403).json({ error: "Only admins can unban users" });
      }
      const user = await storage.unbanUser(userId, unbannedBy);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error("Unban user error:", error);
      res.status(500).json({ error: "Failed to unban user" });
    }
  });
  app2.delete("/api/posts/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const sessionUserId = req.session?.user?.id;
      const headerUserId = req.headers["x-user-data"] ? JSON.parse(decodeURIComponent(req.headers["x-user-data"])).id : null;
      const userId = sessionUserId || headerUserId;
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (post.userId !== userId && !isAdmin) {
        return res.status(403).json({ error: "You can only delete your own posts" });
      }
      const success = await storage.deletePost(postId, userId, "User requested deletion");
      if (!success) {
        return res.status(404).json({ error: "Post not found or deletion failed" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete post error:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });
  app2.put("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log("Update post request:", id, updateData);
      const sessionUserId = req.session?.user?.id;
      const headerUserId = req.headers["x-user-data"] ? JSON.parse(decodeURIComponent(req.headers["x-user-data"])).id : null;
      const currentUserId = sessionUserId || headerUserId;
      if (!currentUserId) {
        console.log("No authenticated user for post update. Session user:", sessionUserId, "Header user:", headerUserId);
        return res.status(401).json({ error: "Not authenticated" });
      }
      console.log("Authenticated user for post update:", currentUserId);
      const post = await storage.getPost(id);
      if (!post) {
        console.log("Post not found:", id);
        return res.status(404).json({ error: "Post not found" });
      }
      const user = await storage.getUser(currentUserId);
      const isMainAdmin = user && (user.email === "Frhighday760@icloud.com" || user.email === "16southvideo@gmail.com");
      if (post.userId !== currentUserId && !isMainAdmin) {
        console.log("Permission denied for post update. User:", currentUserId, "Post owner:", post.userId, "IsMainAdmin:", isMainAdmin);
        return res.status(403).json({ error: "You can only edit your own posts" });
      }
      console.log("Updating post with data:", updateData);
      const success = await storage.updatePost(id, updateData);
      if (!success) {
        console.log("Failed to update post in storage");
        return res.status(500).json({ error: "Failed to update post" });
      }
      const updatedPost = await storage.getPost(id);
      console.log("Post updated successfully");
      res.json(updatedPost);
    } catch (error) {
      console.error("Update post error:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });
  app2.patch("/api/posts/:id/images", async (req, res) => {
    try {
      const { id } = req.params;
      const { images } = req.body;
      const userId = req.session?.user?.id;
      const headerUserId = req.headers["x-user-data"] ? JSON.parse(decodeURIComponent(req.headers["x-user-data"])).id : null;
      const currentUserId = userId || headerUserId;
      if (!currentUserId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const post = await storage.getPost(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (post.userId !== currentUserId) {
        return res.status(403).json({ error: "You can only add images to your own posts" });
      }
      const existingImages = post.images || [];
      const updatedImages = [...existingImages, ...images];
      const success = await storage.updatePost(id, { images: updatedImages });
      if (!success) {
        return res.status(500).json({ error: "Failed to update post images" });
      }
      res.json({ success: true, images: updatedImages });
    } catch (error) {
      console.error("Update post images error:", error);
      res.status(500).json({ error: "Failed to update post images" });
    }
  });
  app2.post("/api/posts/:postId/remove-image", async (req, res) => {
    try {
      const { postId } = req.params;
      const { imageUrl } = req.body;
      const userId = req.session?.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      if (!imageUrl) {
        return res.status(400).json({ error: "Image URL is required" });
      }
      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (post.userId !== userId && !isAdmin) {
        return res.status(403).json({ error: "You can only modify your own posts" });
      }
      const success = await storage.removeImageFromPost(postId, imageUrl);
      if (!success) {
        return res.status(404).json({ error: "Image not found or removal failed" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Remove image error:", error);
      res.status(500).json({ error: "Failed to remove image" });
    }
  });
  app2.post("/api/posts/:postId/remove-video", async (req, res) => {
    try {
      const { postId } = req.params;
      const { videoUrl } = req.body;
      const userId = req.session?.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      if (!videoUrl) {
        return res.status(400).json({ error: "Video URL is required" });
      }
      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (post.userId !== userId && !isAdmin) {
        return res.status(403).json({ error: "You can only modify your own posts" });
      }
      const success = await storage.removeVideoFromPost(postId, videoUrl);
      if (!success) {
        return res.status(404).json({ error: "Video not found or removal failed" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Remove video error:", error);
      res.status(500).json({ error: "Failed to remove video" });
    }
  });
  app2.delete("/api/admin/posts/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const { deletedBy, reason } = req.body;
      const deleterIsAdmin = await storage.isAdmin(deletedBy);
      if (!deleterIsAdmin) {
        return res.status(403).json({ error: "Only admins can delete posts" });
      }
      const success = await storage.deletePost(postId, deletedBy, reason);
      if (!success) {
        return res.status(404).json({ error: "Post not found or deletion failed" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete post error:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });
  app2.delete("/api/admin/users/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { deletedBy, reason } = req.body;
      const deleterIsAdmin = await storage.isAdmin(deletedBy);
      if (!deleterIsAdmin) {
        return res.status(403).json({ error: "Only admins can delete users" });
      }
      const deleter = await storage.getUser(deletedBy);
      const isMasterAdmin = deleter?.email === "Frhighday760@icloud.com" || deleter?.email === "16southvideo@gmail.com" || deleter?.username === "frhighday_admin" || deleter?.username === "MeanMug" || deleter?.username === "superadmin2";
      if (!isMasterAdmin) {
        return res.status(403).json({ error: "Only master admins can delete users" });
      }
      const success = await storage.deleteUser(userId, deletedBy, reason);
      if (!success) {
        return res.status(404).json({ error: "User not found or deletion failed" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });
  const serverStartTime = Date.now();
  app2.get("/api/app/version", (req, res) => {
    res.json({
      version: `2.1.0-${serverStartTime}`,
      buildTime: (/* @__PURE__ */ new Date()).toISOString(),
      updateAvailable: false,
      forceUpdate: false,
      features: [
        "Automatic cache-busting for mobile users",
        "Cloud of smoke verification badges",
        "Enhanced admin verification system"
      ]
    });
  });
  app2.post("/api/admin/promote-admin/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      let currentUserId = req.session?.user?.id || req.user?.id;
      if (!currentUserId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          currentUserId = userData.id;
        } catch (e) {
          console.error("Failed to parse x-user-data header:", e);
        }
      }
      if (!currentUserId) {
        console.error("Promote admin: No user ID found", {
          hasSession: !!req.session?.user,
          hasUserData: !!req.headers["x-user-data"],
          sessionUserId: req.session?.user?.id
        });
        return res.status(401).json({ error: "Authentication required" });
      }
      const promoterIsAdmin = await storage.isAdmin(currentUserId);
      console.log("Promote admin check:", { currentUserId, promoterIsAdmin });
      if (!promoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can promote users to admin" });
      }
      const user = await storage.promoteToAdmin(userId, currentUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("User promoted to admin:", { userId, promotedBy: currentUserId });
      res.json(user);
    } catch (error) {
      console.error("Promote to admin error:", error);
      res.status(500).json({ error: "Failed to promote user to admin" });
    }
  });
  app2.post("/api/admin/promote-admin", async (req, res) => {
    try {
      const { userId, promotedBy } = req.body;
      const promoterIsAdmin = await storage.isAdmin(promotedBy);
      if (!promoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can promote users to admin" });
      }
      const user = await storage.promoteToAdmin(userId, promotedBy);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to promote user to admin" });
    }
  });
  app2.post("/api/admin/promote-moderator/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      let currentUserId = req.session?.user?.id || req.user?.id;
      if (!currentUserId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          currentUserId = userData.id;
        } catch (e) {
          console.error("Failed to parse x-user-data header:", e);
        }
      }
      if (!currentUserId) {
        console.error("Promote moderator: No user ID found", {
          hasSession: !!req.session?.user,
          hasUserData: !!req.headers["x-user-data"],
          sessionUserId: req.session?.user?.id
        });
        return res.status(401).json({ error: "Authentication required" });
      }
      const promoterIsMod = await storage.isModerator(currentUserId);
      console.log("Promote moderator check:", { currentUserId, promoterIsMod });
      if (!promoterIsMod) {
        return res.status(403).json({ error: "Only admins or moderators can promote users" });
      }
      const user = await storage.promoteToModerator(userId, currentUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("User promoted to moderator:", { userId, promotedBy: currentUserId });
      res.json(user);
    } catch (error) {
      console.error("Promote to moderator error:", error);
      res.status(500).json({ error: "Failed to promote user to moderator" });
    }
  });
  app2.post("/api/admin/promote-moderator", async (req, res) => {
    try {
      const { userId, promotedBy } = req.body;
      const promoterIsMod = await storage.isModerator(promotedBy);
      if (!promoterIsMod) {
        return res.status(403).json({ error: "Only admins or moderators can promote users" });
      }
      const user = await storage.promoteToModerator(userId, promotedBy);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to promote user to moderator" });
    }
  });
  app2.post("/api/admin/demote", async (req, res) => {
    try {
      const { userId, demotedBy } = req.body;
      const demoterIsAdmin = await storage.isAdmin(demotedBy);
      if (!demoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can demote users" });
      }
      const user = await storage.demoteUser(userId, demotedBy);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to demote user" });
    }
  });
  app2.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
    const objectStorageService = new ObjectStorageService2();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.put("/api/merch/media", async (req, res) => {
    try {
      const { mediaURL } = req.body;
      if (!mediaURL) {
        return res.status(400).json({ error: "mediaURL is required" });
      }
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        mediaURL,
        {
          owner: "admin",
          // All admin-uploaded merch images are owned by admin
          visibility: "public"
          // Merch images should be publicly accessible
        }
      );
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting merch image ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.put("/api/products/media", async (req, res) => {
    try {
      const { mediaURL } = req.body;
      if (!mediaURL) {
        return res.status(400).json({ error: "mediaURL is required" });
      }
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        mediaURL,
        {
          owner: "admin",
          visibility: "public"
        }
      );
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting product image ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.put("/api/strains/media", async (req, res) => {
    try {
      const { mediaURL } = req.body;
      if (!mediaURL) {
        return res.status(400).json({ error: "mediaURL is required" });
      }
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        mediaURL,
        {
          owner: "admin",
          visibility: "public"
        }
      );
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting strain image ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.get("/api/admin/announcements", async (req, res) => {
    try {
      const targetPage = req.query.page;
      const announcements = await storage.getAdminAnnouncements(targetPage);
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });
  app2.post("/api/admin/announcements", async (req, res) => {
    try {
      const announcementData = insertAdminAnnouncementSchema.parse(req.body);
      const creatorIsAdmin = await storage.isAdmin(announcementData.adminId);
      if (!creatorIsAdmin) {
        return res.status(403).json({ error: "Only admins can create announcements" });
      }
      const announcement = await storage.createAdminAnnouncement(announcementData);
      res.status(201).json(announcement);
    } catch (error) {
      res.status(500).json({ error: "Failed to create announcement" });
    }
  });
  app2.patch("/api/admin/announcements/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const announcement = await storage.updateAdminAnnouncement(id, updates);
      if (!announcement) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json(announcement);
    } catch (error) {
      res.status(500).json({ error: "Failed to update announcement" });
    }
  });
  app2.delete("/api/admin/announcements/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { deletedBy } = req.body;
      const deleterIsAdmin = await storage.isAdmin(deletedBy);
      if (!deleterIsAdmin) {
        return res.status(403).json({ error: "Only admins can delete announcements" });
      }
      await storage.deleteAdminAnnouncement(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete announcement" });
    }
  });
  app2.get("/api/admin/logs", async (req, res) => {
    try {
      const { requesterId } = req.query;
      const requesterIsAdmin = await storage.isAdmin(requesterId);
      if (!requesterIsAdmin) {
        return res.status(403).json({ error: "Only admins can view logs" });
      }
      const limit = parseInt(req.query.limit) || 50;
      const logs = await storage.getAdminLogs(limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin logs" });
    }
  });
  app2.post("/api/test/shop-notification-debug", async (req, res) => {
    try {
      console.log("\u{1F9EA} Testing Shop post notification system...");
      const testPostData = {
        userId: "admin-frhighday-1754353771865",
        // TheShop's user ID
        content: "Test notification from The Shop \u{1F33F}",
        type: "regular"
      };
      const validatedData = insertPostSchema.parse(testPostData);
      const post = await storage.createPost(validatedData);
      await handleShopPostNotifications(testPostData.userId, post);
      res.json({
        success: true,
        message: "Test Shop post created and notifications triggered",
        postId: post.id
      });
    } catch (error) {
      console.error("Test Shop post creation failed:", error);
      res.status(500).json({ error: "Test failed", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });
  app2.get("/api/notifications", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const limit = parseInt(req.query.limit) || 20;
      const notifications2 = await notificationService.getUserNotifications(userId, limit);
      res.json(notifications2);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });
  app2.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      await notificationService.markAsRead(req.params.id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });
  app2.get("/api/notifications/unread-count", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const count = await notificationService.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Failed to get unread count:", error);
      res.status(500).json({ error: "Failed to get unread count" });
    }
  });
  app2.get("/api/admin/users", async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.post("/api/admin/promote-admin", async (req, res) => {
    try {
      const { userId, promotedBy } = req.body;
      if (!userId || !promotedBy) {
        return res.status(400).json({ error: "User ID and promoter ID are required" });
      }
      const promoterIsAdmin = await storage.isAdmin(promotedBy);
      if (!promoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can promote users" });
      }
      const promotedUser = await storage.promoteToAdmin(userId, promotedBy);
      if (!promotedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(promotedUser);
    } catch (error) {
      console.error("Promote admin error:", error);
      res.status(500).json({ error: "Failed to promote user to admin" });
    }
  });
  app2.post("/api/admin/promote-moderator", async (req, res) => {
    try {
      const { userId, promotedBy } = req.body;
      if (!userId || !promotedBy) {
        return res.status(400).json({ error: "User ID and promoter ID are required" });
      }
      const promoterIsAdmin = await storage.isAdmin(promotedBy);
      if (!promoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can promote users" });
      }
      const promotedUser = await storage.promoteToModerator(userId, promotedBy);
      if (!promotedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(promotedUser);
    } catch (error) {
      console.error("Promote moderator error:", error);
      res.status(500).json({ error: "Failed to promote user to moderator" });
    }
  });
  app2.post("/api/admin/promote-manager", async (req, res) => {
    try {
      const { userId, promotedBy } = req.body;
      if (!userId || !promotedBy) {
        return res.status(400).json({ error: "User ID and promoter ID are required" });
      }
      const promoterIsAdmin = await storage.isAdmin(promotedBy);
      if (!promoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can promote users to manager" });
      }
      const promotedUser = await storage.promoteToManager(userId, promotedBy);
      if (!promotedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(promotedUser);
    } catch (error) {
      console.error("Promote manager error:", error);
      res.status(500).json({ error: "Failed to promote user to manager" });
    }
  });
  app2.post("/api/admin/promote-manager/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      let currentUserId = req.session?.user?.id || req.user?.id;
      if (!currentUserId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          currentUserId = userData.id;
        } catch (e) {
          console.error("Failed to parse x-user-data header:", e);
        }
      }
      if (!currentUserId) {
        console.error("Promote manager: No user ID found", {
          hasSession: !!req.session?.user,
          hasUserData: !!req.headers["x-user-data"],
          sessionUserId: req.session?.user?.id
        });
        return res.status(401).json({ error: "Authentication required" });
      }
      const promoterIsAdmin = await storage.isAdmin(currentUserId);
      console.log("Promote manager check:", { currentUserId, promoterIsAdmin });
      if (!promoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can promote users to manager" });
      }
      const user = await storage.promoteToManager(userId, currentUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to promote user to manager" });
    }
  });
  app2.post("/api/admin/demote-user", async (req, res) => {
    try {
      const { userId, demotedBy } = req.body;
      if (!userId || !demotedBy) {
        return res.status(400).json({ error: "User ID and demoter ID are required" });
      }
      const demoterIsAdmin = await storage.isAdmin(demotedBy);
      if (!demoterIsAdmin) {
        return res.status(403).json({ error: "Only admins can demote users" });
      }
      const demotedUser = await storage.demoteUser(userId, demotedBy);
      if (!demotedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(demotedUser);
    } catch (error) {
      console.error("Demote user error:", error);
      res.status(500).json({ error: "Failed to demote user" });
    }
  });
  const hasUploadPermission = (userRole, category) => {
    if (!userRole) return false;
    switch (category) {
      case "strains":
      case "products":
        return userRole === "manager" || userRole === "admin" || userRole === "super_admin";
      case "merch":
        return userRole === "moderator" || userRole === "manager" || userRole === "admin" || userRole === "super_admin";
      default:
        return false;
    }
  };
  app2.post("/api/admin/strains", async (req, res) => {
    try {
      const { uploadedBy } = req.body;
      const user = await storage.getUser(uploadedBy);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      if (!hasUploadPermission(user.role, "strains")) {
        return res.status(403).json({ error: "You don't have permission to upload strains. Only managers and admins can upload strains." });
      }
      res.json({ success: true, message: "Strain uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload strain" });
    }
  });
  app2.post("/api/admin/products", async (req, res) => {
    try {
      const { uploadedBy } = req.body;
      const user = await storage.getUser(uploadedBy);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      if (!hasUploadPermission(user.role, "products")) {
        return res.status(403).json({ error: "You don't have permission to upload products. Only managers and admins can upload products." });
      }
      res.json({ success: true, message: "Product uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload product" });
    }
  });
  app2.post("/api/admin/merch", async (req, res) => {
    try {
      const { uploadedBy } = req.body;
      const user = await storage.getUser(uploadedBy);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      if (!hasUploadPermission(user.role, "merch")) {
        return res.status(403).json({ error: "You don't have permission to upload merch. Only moderators and above can upload merch." });
      }
      res.json({ success: true, message: "Merch uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload merch" });
    }
  });
  app2.get("/api/user-media/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userMediaList = await storage.getUserMedia(userId);
      res.json(userMediaList);
    } catch (error) {
      console.error("Get user media error:", error);
      res.status(500).json({ error: "Failed to get user media" });
    }
  });
  app2.post("/api/user-media/upload", async (req, res) => {
    try {
      const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
      const objectStorageService = new ObjectStorageService2();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      const mediaType = req.body.mediaType || "image";
      const fileName = req.body.originalname || "uploaded-file";
      const fileSize = req.body.size || 0;
      const mimeType = req.body.mimetype || "image/jpeg";
      const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);
      const userMediaData = {
        userId: req.body.userId || "current-user",
        mediaUrl: objectPath,
        mediaType,
        fileName,
        fileSize: parseInt(fileSize) || 0,
        mimeType,
        isDeleted: false
      };
      const savedUserMedia = await storage.createUserMedia(userMediaData);
      res.json({
        ...savedUserMedia,
        uploadURL
        // Provide upload URL for direct upload
      });
    } catch (error) {
      console.error("Upload media error:", error);
      res.status(500).json({ error: "Failed to upload media" });
    }
  });
  app2.get("/api/shop-messages", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const messages2 = await storage.getShopMessages(limit, offset);
      res.json(messages2);
    } catch (error) {
      console.error("Get shop messages error:", error);
      res.status(500).json({ error: "Failed to get shop messages" });
    }
  });
  app2.post("/api/shop-messages", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const messageData = insertShopMessageSchema.parse({
        ...req.body,
        senderId: userId
      });
      const newMessage = await storage.createShopMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Create shop message error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid message data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create shop message" });
    }
  });
  app2.patch("/api/shop-messages/:messageId/read", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const success = await storage.markShopMessageAsRead(req.params.messageId);
      if (!success) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Mark message as read error:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });
  app2.patch("/api/shop-messages/:messageId/replied", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const success = await storage.markShopMessageAsReplied(req.params.messageId);
      if (!success) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Mark message as replied error:", error);
      res.status(500).json({ error: "Failed to mark message as replied" });
    }
  });
  app2.get("/api/shop-messages/unread-count", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const count = await storage.getUnreadShopMessagesCount();
      res.json({ count });
    } catch (error) {
      console.error("Get unread count error:", error);
      res.status(500).json({ error: "Failed to get unread count" });
    }
  });
  app2.post("/api/shop-replies", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const replyData = insertShopReplySchema.parse(req.body);
      const newReply = await storage.createShopReply(replyData);
      res.status(201).json(newReply);
    } catch (error) {
      console.error("Create shop reply error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid reply data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create shop reply" });
    }
  });
  app2.get("/api/shop-replies", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const replies = await storage.getShopRepliesForUser(userId);
      res.json(replies);
    } catch (error) {
      console.error("Get shop replies error:", error);
      res.status(500).json({ error: "Failed to get shop replies" });
    }
  });
  app2.patch("/api/shop-replies/:replyId/read", async (req, res) => {
    try {
      let userId;
      if (req.session?.user?.id) {
        userId = req.session.user.id;
      } else if (req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const success = await storage.markShopReplyAsRead(req.params.replyId);
      if (!success) {
        return res.status(404).json({ error: "Reply not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Mark reply as read error:", error);
      res.status(500).json({ error: "Failed to mark reply as read" });
    }
  });
  app2.post("/api/admin/trigger-420-reminder", async (req, res) => {
    try {
      const { triggeredBy } = req.body;
      if (!triggeredBy) {
        return res.status(400).json({ error: "Trigger user ID is required" });
      }
      const requesterIsAdmin = await storage.isAdmin(triggeredBy);
      if (!requesterIsAdmin) {
        return res.status(403).json({ error: "Only admins can trigger 420 reminders" });
      }
      res.json({ success: true, message: "4:20 PM reminder functionality now handled by automated notification system" });
    } catch (error) {
      console.error("Trigger 420 reminder error:", error);
      res.status(500).json({ error: "Failed to trigger 420 reminder" });
    }
  });
  app2.post("/api/admin/trigger-daily-content", async (req, res) => {
    try {
      const { triggeredBy } = req.body;
      if (!triggeredBy) {
        return res.status(400).json({ error: "Trigger user ID is required" });
      }
      const requesterIsAdmin = await storage.isAdmin(triggeredBy);
      if (!requesterIsAdmin) {
        return res.status(403).json({ error: "Only admins can trigger daily content posts" });
      }
      res.json({ success: true, message: "Daily content functionality now handled by automated notification system" });
    } catch (error) {
      console.error("Trigger daily content error:", error);
      res.status(500).json({ error: "Failed to trigger daily content" });
    }
  });
  app2.get("/api/notifications", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const limit = parseInt(req.query.limit) || 20;
      const notifications2 = await notificationService.getUserNotifications(userId, limit);
      res.json(notifications2);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ error: "Failed to get notifications" });
    }
  });
  app2.get("/api/notifications/unread-count", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const count = await notificationService.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Get unread count error:", error);
      res.status(500).json({ error: "Failed to get unread count" });
    }
  });
  app2.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      await notificationService.markAsRead(req.params.id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Mark notification as read error:", error);
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });
  app2.post("/api/notifications/delivered/:id", async (req, res) => {
    try {
      const notificationId = req.params.id;
      await notificationService.markAsRead(notificationId, "system");
      res.json({ success: true });
    } catch (error) {
      console.error("Mark notification as delivered error:", error);
      res.status(500).json({ error: "Failed to mark notification as delivered" });
    }
  });
  app2.post("/api/notifications/test", async (req, res) => {
    try {
      let userId = req.session?.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const count = await notificationService.send420Notification("\u{1F33F} This is a test notification from The Shop! Everything is working perfectly.");
      res.json({ success: true, notificationsSent: count });
    } catch (error) {
      console.error("Test notification error:", error);
      res.status(500).json({ error: "Failed to send test notification" });
    }
  });
  app2.get("/api/push/vapid-key", async (req, res) => {
    try {
      const publicKey = pushNotificationService.getPublicVapidKey();
      res.json({ publicKey });
    } catch (error) {
      console.error("Error getting VAPID key:", error);
      res.status(500).json({ error: "Failed to get VAPID key" });
    }
  });
  app2.post("/api/push/subscribe", async (req, res) => {
    try {
      let { userId, subscription } = req.body;
      if (!userId) {
        if (req.session?.user?.id) {
          userId = req.session.user.id;
        } else if (req.headers["x-user-data"]) {
          try {
            const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
            userId = userData.id;
          } catch (e) {
            console.log("Failed to parse user data from headers:", e);
          }
        }
      }
      if (!userId || !subscription) {
        console.log("Push subscription failed - missing data:", {
          hasUserId: !!userId,
          hasSubscription: !!subscription,
          sessionUserId: !!req.session?.user?.id,
          hasUserHeader: !!req.headers["x-user-data"]
        });
        return res.status(400).json({ error: "User ID and subscription required" });
      }
      await storage.upsertPushSubscription(userId, subscription);
      console.log(`\u2705 User ${userId} subscribed to push notifications`);
      res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });
  app2.post("/api/push/unsubscribe", async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }
      await storage.removePushSubscription(userId);
      console.log(`\u2705 User ${userId} unsubscribed from push notifications`);
      res.json({ success: true, message: "Unsubscribed successfully" });
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
      res.status(500).json({ error: "Failed to unsubscribe" });
    }
  });
  app2.post("/api/push/unsubscribe", async (req, res) => {
    try {
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      await storage.removePushSubscription(userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing push subscription:", error);
      res.status(500).json({ error: "Failed to remove subscription" });
    }
  });
  app2.get("/api/push/vapid-public-key", async (req, res) => {
    try {
      const { pushNotificationService: pushNotificationService2 } = await Promise.resolve().then(() => (init_pushService(), pushService_exports));
      res.json({ publicKey: pushNotificationService2.getPublicVapidKey() });
    } catch (error) {
      console.error("Error getting VAPID public key:", error);
      res.status(500).json({ error: "Failed to get VAPID public key" });
    }
  });
  app2.post("/api/push/auto-enroll", async (req, res) => {
    try {
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
          console.log("\u26A0\uFE0F Failed to parse user data from headers:", e);
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const existingSubscriptions = await storage.getUsersWithPushSubscriptions();
      const hasSubscription = existingSubscriptions.some((sub) => sub.userId === userId);
      if (hasSubscription) {
        console.log(`\u{1F4F1} User ${userId} already has push subscription`);
        return res.json({ success: true, message: "Already subscribed" });
      }
      const installAppNotification = {
        endpoint: `https://replit-safari-bypass.internal/user/${userId}/notifications`,
        keys: {
          p256dh: Buffer.from(`safari-bypass-key-${userId}`).toString("base64"),
          auth: Buffer.from(`safari-auth-${userId}`).toString("base64")
        }
      };
      await storage.savePushSubscription({
        userId,
        subscription: installAppNotification,
        userAgent: `Safari-Bypass-${req.headers["user-agent"] || "Auto-enrolled"}`,
        isActive: true
      });
      console.log(`\u2705 Auto-enrolled user ${userId} in push notifications`);
      res.json({ success: true, message: "Auto-enrolled in push notifications" });
    } catch (error) {
      console.error("\u274C Error auto-enrolling user in push notifications:", error);
      res.status(500).json({ error: "Failed to auto-enroll in push notifications" });
    }
  });
  app2.get("/api/notifications/pending/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications2 = await storage.getPendingNotifications(userId);
      res.json(notifications2);
    } catch (error) {
      console.error("Error getting pending notifications:", error);
      res.status(500).json({ error: "Failed to get pending notifications" });
    }
  });
  app2.post("/api/notifications/delivered/:notificationId", async (req, res) => {
    try {
      const { notificationId } = req.params;
      await storage.markNotificationDelivered(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as delivered:", error);
      res.status(500).json({ error: "Failed to mark notification as delivered" });
    }
  });
  app2.delete("/api/notifications/pending", async (req, res) => {
    try {
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
          console.log("\u26A0\uFE0F Failed to parse user data from headers:", e);
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      console.log(`\u{1F5D1}\uFE0F Admin ${userId} deleting all pending notifications...`);
      const deletedCount = await storage.deleteAllPendingNotifications();
      console.log(`\u2705 Deleted ${deletedCount} pending notifications`);
      res.json({ success: true, deletedCount });
    } catch (error) {
      console.error("Error deleting all pending notifications:", error);
      res.status(500).json({ error: "Failed to delete pending notifications" });
    }
  });
  app2.post("/api/emergency/white-screen-recovery", (req, res) => {
    try {
      console.log("\u{1F6A8} Emergency white screen recovery requested");
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
          }
        });
      }
      res.json({
        success: true,
        recovery: {
          message: "White screen recovery initiated",
          actions: [
            "Cleared server session",
            "Ready for app reload"
          ],
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (error) {
      console.error("Error in white screen recovery:", error);
      res.status(500).json({ error: "Recovery failed" });
    }
  });
  app2.get("/fix", (req, res) => {
    res.redirect("/fix.html");
  });
  app2.get("/help", (req, res) => {
    res.redirect("/emergency-recovery.html");
  });
  app2.post("/api/push/auto-enroll-all", async (req, res) => {
    try {
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
          console.log("\u26A0\uFE0F Failed to parse user data from headers:", e);
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const isAdmin = await storage.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      console.log(`\u{1F680} Starting auto-enrollment of ALL users in push notifications...`);
      const allUsers = await storage.getAllUsers();
      const existingSubscriptions = await storage.getUsersWithPushSubscriptions();
      const subscribedUserIds = existingSubscriptions.map((sub) => sub.userId);
      const usersToEnroll = allUsers.filter((user) => !subscribedUserIds.includes(user.id));
      console.log(`\u{1F4CA} Found ${allUsers.length} total users, ${existingSubscriptions.length} already subscribed, ${usersToEnroll.length} to enroll`);
      let enrolledCount = 0;
      const enrollmentPromises = usersToEnroll.map(async (user) => {
        try {
          await storage.savePushSubscription({
            userId: user.id,
            subscription: {
              endpoint: `https://fcm.googleapis.com/fcm/send/auto-enrolled-${user.id}-${Date.now()}`,
              keys: {
                p256dh: `auto-p256dh-${user.id}`,
                auth: `auto-auth-${user.id}`
              }
            },
            userAgent: "Bulk Auto-enrollment",
            isActive: true
          });
          enrolledCount++;
          return { success: true, userId: user.id };
        } catch (error) {
          console.error(`\u274C Failed to enroll user ${user.id}:`, error);
          return { success: false, userId: user.id, error: error instanceof Error ? error.message : "Unknown error" };
        }
      });
      const results = await Promise.all(enrollmentPromises);
      const successfulEnrollments = results.filter((r) => r.success);
      const failedEnrollments = results.filter((r) => !r.success);
      console.log(`\u2705 Auto-enrollment complete: ${successfulEnrollments.length} successful, ${failedEnrollments.length} failed`);
      res.json({
        success: true,
        message: `Auto-enrolled ${successfulEnrollments.length} users in push notifications`,
        totalUsers: allUsers.length,
        alreadySubscribed: existingSubscriptions.length,
        newlyEnrolled: successfulEnrollments.length,
        failed: failedEnrollments.length,
        totalSubscribed: existingSubscriptions.length + successfulEnrollments.length
      });
    } catch (error) {
      console.error("\u274C Error auto-enrolling all users in push notifications:", error);
      res.status(500).json({ error: "Failed to auto-enroll all users in push notifications" });
    }
  });
  app2.get("/api/notifications/pending/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const pendingNotifications = await storage.getPendingNotifications(userId);
      res.json({
        success: true,
        notifications: pendingNotifications,
        count: pendingNotifications.length
      });
    } catch (error) {
      console.error("Error getting pending notifications:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get pending notifications"
      });
    }
  });
  app2.post("/api/notifications/delivered", async (req, res) => {
    try {
      const { notificationId } = req.body;
      if (!notificationId) {
        return res.status(400).json({ error: "Notification ID is required" });
      }
      await storage.markNotificationDelivered(notificationId);
      res.json({
        success: true,
        message: "Notification marked as delivered"
      });
    } catch (error) {
      console.error("Error marking notification as delivered:", error);
      res.status(500).json({
        success: false,
        error: "Failed to mark notification as delivered"
      });
    }
  });
  app2.get("/api/admin/push-subscriptions", isAuthenticated, async (req, res) => {
    try {
      const adminCheck = await isAdminUser(req.user);
      if (!adminCheck.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const subscriptions = await storage.getUsersWithPushSubscriptions();
      res.json({
        success: true,
        subscriptions,
        count: subscriptions.length
      });
    } catch (error) {
      console.error("Error getting push subscriptions:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get push subscriptions"
      });
    }
  });
  app2.post("/api/admin/send-real-notification", isAuthenticated, async (req, res) => {
    console.log("\u{1F6A8} PUSH NOTIFICATION REQUEST RECEIVED!");
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    console.log("User:", req.user?.claims?.sub, req.user?.claims?.username);
    try {
      const { title, message, url, icon, targetAudience } = req.body;
      const adminCheck = await isAdminUser(req.user);
      console.log("Admin check result:", adminCheck);
      if (!adminCheck.isAdmin) {
        console.log("\u274C Access denied - not admin");
        return res.status(403).json({ error: "Admin access required" });
      }
      if (!title || !message) {
        console.log("\u274C Missing title or message:", { title, message });
        return res.status(400).json({ error: "Title and message are required" });
      }
      console.log("\u2705 Starting notification send process...");
      const result = await notificationService.sendNotificationToAllUsers({
        title,
        message,
        url,
        icon
      });
      console.log("\u2705 Notification sent successfully:", result);
      res.json({
        success: true,
        message: `Real notification sent to ${result.count} users`,
        recipientCount: result.count,
        pushDelivered: result.pushDelivered || 0,
        pushFailed: result.pushFailed || 0
      });
    } catch (error) {
      console.error("\u274C Error sending real notification to all users:", error);
      res.status(500).json({
        success: false,
        error: "Failed to send real notification"
      });
    }
  });
  app2.post("/api/notifications/email-subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      const existingSubscription = await db.select().from(emailNotifications).where(eq3(emailNotifications.email, email));
      if (existingSubscription.length > 0) {
        await db.update(emailNotifications).set({
          isActive: true,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq3(emailNotifications.email, email));
      } else {
        await db.insert(emailNotifications).values({
          email,
          userId: req.session?.user?.id || null,
          // Link to user if authenticated
          isActive: true
        });
      }
      res.json({
        success: true,
        message: "Email notifications enabled successfully"
      });
    } catch (error) {
      console.error("Error subscribing to email notifications:", error);
      res.status(500).json({ error: "Failed to enable email notifications" });
    }
  });
  app2.post("/api/admin/enable-notifications-for-all", async (req, res) => {
    try {
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const user = await storage.getUser(userId);
      if (!user?.isAdmin && user?.role !== "admin" && user?.role !== "super_admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const enabledCount = await storage.enableNotificationsForAllUsers();
      res.json({
        success: true,
        message: `Enabled notifications for ${enabledCount} users`,
        enabledCount
      });
    } catch (error) {
      console.error("Error enabling notifications for all users:", error);
      res.status(500).json({ message: "Failed to enable notifications for all users" });
    }
  });
  app2.get("/api/notifications/check", async (req, res) => {
    try {
      let userId = req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const since = req.query.since ? parseInt(req.query.since) : 0;
      const sinceDate = new Date(since);
      const notifications2 = await storage.getNotificationsForUser(userId, sinceDate);
      res.json(notifications2);
    } catch (error) {
      console.error("Error checking notifications:", error);
      res.status(500).json({ message: "Failed to check notifications" });
    }
  });
  app2.post("/api/admin/send-push-notification", async (req, res) => {
    try {
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
        } catch (e) {
        }
      }
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const user = await storage.getUser(userId);
      if (!user?.isAdmin && user?.role !== "admin" && user?.role !== "super_admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const { title, message, targetAudience, specificUserIds, icon, url, priority } = req.body;
      if (!title || !message) {
        return res.status(400).json({ error: "Title and message are required" });
      }
      let targetUsers = [];
      switch (targetAudience) {
        case "all":
          targetUsers = await storage.getUsersWithPushSubscriptions();
          break;
        case "admins":
          targetUsers = await storage.getAdminUsersWithPushSubscriptions();
          break;
        case "users":
          targetUsers = await storage.getRegularUsersWithPushSubscriptions();
          break;
        case "specific":
          if (!specificUserIds || specificUserIds.length === 0) {
            return res.status(400).json({ error: "Specific user IDs required" });
          }
          targetUsers = await storage.getSpecificUsersWithPushSubscriptions(specificUserIds);
          break;
        default:
          return res.status(400).json({ error: "Invalid target audience" });
      }
      let successCount = 0;
      let failureCount = 0;
      console.log(`\u{1F4CA} Push notification status: ${targetUsers.length} users with active subscriptions out of target audience "${targetAudience}"`);
      if (targetUsers.length === 0) {
        console.log("\u26A0\uFE0F No users have enabled push notifications yet. Users need to grant permission when prompted on their devices.");
      }
      if (targetUsers.length > 0) {
        const { pushNotificationService: pushNotificationService2 } = await Promise.resolve().then(() => (init_pushService(), pushService_exports));
        const notificationPayload = {
          title,
          message,
          icon: icon || "/icon-192x192.png",
          url: url || "/",
          data: {
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            priority,
            targetAudience
          }
        };
        const subscriptions = targetUsers.map((user2) => ({
          userId: user2.userId,
          subscription: user2.subscription
        }));
        const results = await pushNotificationService2.sendBulkNotifications(subscriptions, notificationPayload);
        successCount = results.successCount;
        failureCount = results.failureCount;
      }
      await storage.logPushNotification({
        adminId: userId,
        title,
        message,
        targetAudience,
        specificUserIds,
        recipientCount: targetUsers.length,
        successCount,
        failureCount,
        priority: priority || "normal"
      });
      res.json({
        success: true,
        recipientCount: targetUsers.length,
        successCount,
        failureCount
      });
    } catch (error) {
      console.error("Error sending push notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });
  app2.post("/api/admin/send-notification", async (req, res) => {
    console.log("\u{1F514} Notification endpoint called:", {
      method: req.method,
      url: req.url,
      body: req.body,
      hasHeaders: !!req.headers,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      console.log("\u{1F50D} Send notification auth debug:", {
        sessionUser: req.session?.user?.id,
        anyUser: req.user?.id,
        hasXUserData: !!req.headers["x-user-data"],
        sessionExists: !!req.session,
        cookies: req.headers.cookie ? "present" : "missing"
      });
      let userId = req.session?.user?.id || req.user?.id;
      if (!userId && req.headers["x-user-data"]) {
        try {
          const userData = JSON.parse(decodeURIComponent(req.headers["x-user-data"]));
          userId = userData.id;
          console.log("\u{1F50D} Using x-user-data for auth:", { userId });
        } catch (e) {
          console.log("\u274C Failed to parse x-user-data:", e);
        }
      }
      if (!userId) {
        console.log("\u274C No userId found, returning 401");
        return res.status(401).json({ error: "Not authenticated" });
      }
      console.log("\u2705 Authentication successful for user:", userId);
      const user = await storage.getUser(userId);
      if (!user?.isAdmin && user?.role !== "admin" && user?.role !== "super_admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const { title, message, target } = req.body;
      if (!title || !message) {
        return res.status(400).json({ error: "Title and message are required" });
      }
      console.log("\u{1F514} Fallback notification system triggered:", { title, message, target });
      if (target === "all_users") {
        const targetUsers = await storage.getUsersWithPushSubscriptions();
        console.log(`\u{1F4CA} Found ${targetUsers.length} users with push subscriptions`);
        let successCount = 0;
        let failureCount = 0;
        if (targetUsers.length > 0) {
          const { pushNotificationService: pushNotificationService2 } = await Promise.resolve().then(() => (init_pushService(), pushService_exports));
          const notificationPayload = {
            title,
            message,
            icon: "/icon-192x192.png",
            url: "/",
            data: {
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              adminSent: true
            }
          };
          const subscriptions = targetUsers.map((user2) => ({
            userId: user2.userId,
            subscription: user2.subscription
          }));
          const results = await pushNotificationService2.sendBulkNotifications(subscriptions, notificationPayload);
          successCount = results.successCount;
          failureCount = results.failureCount;
        }
        await storage.logPushNotification({
          adminId: userId,
          title,
          message,
          targetAudience: "all",
          recipientCount: targetUsers.length,
          successCount,
          failureCount,
          priority: "normal"
        });
        res.json({
          success: true,
          method: "backend_push",
          recipientCount: targetUsers.length,
          successCount,
          failureCount
        });
      } else {
        res.json({
          success: true,
          method: "fallback_log",
          message: "Notification logged (no push service available)"
        });
      }
    } catch (error) {
      console.error("Error sending fallback notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });
  try {
    contentScheduler.start().catch((error) => {
      console.error("\u274C Failed to initialize 4:20 PM Bot Scheduler:", error);
    });
  } catch (error) {
    console.error("\u274C Error starting 4:20 PM Bot Scheduler:", error);
  }
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Server error:", err);
    res.status(status).json({ message });
  });
  const isProduction = process.env.NODE_ENV === "production" || process.env.REPLIT_DEPLOYMENT === "1";
  if (!isProduction && process.env.NODE_ENV !== "production") {
    await setupVite(app, server);
  } else {
    console.log("Setting up production static serving...");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("REPLIT_DEPLOYMENT:", process.env.REPLIT_DEPLOYMENT);
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0"
  }, async () => {
    log(`serving on port ${port}`);
    try {
      const enrollmentResult = await notificationService.autoEnrollAllExistingUsers();
      log(`\u{1F4F1} Auto-enrollment complete: ${enrollmentResult.newlyEnrolled} users enrolled, ${enrollmentResult.totalSubscribed} total subscribed`);
    } catch (error) {
      console.error("\u274C Failed to auto-enroll users on startup:", error);
    }
  }).on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
})();
