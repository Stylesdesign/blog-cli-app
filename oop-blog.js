// ─── Post Class ─────────────────────────

class Post {
  static totalPosts = 0;

  constructor(title, content) {
    this.title = title;
    this.content = content;
    Post.totalPosts++;
  }

  createPost() {
    console.log(`Post created: ${this.title}`);
  }

  editPost(newContent) {
    this.content = newContent;
    console.log(`Post updated: ${this.title}`);
  }

  static countPosts() {
    console.log(`Total posts: ${Post.totalPosts}`);
  }
}

// ─── User Class ─────────────────────────

class User {
  static totalUsers = 0;

  constructor(name, userId) {
    this.name = name;
    this.userId = userId;
    User.totalUsers++;
  }

  createPost(post) {
    console.log(`${this.name} created a post: ${post.title}`);
  }

  viewPosts(posts) {
    console.log(`${this.name} is viewing posts:`);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} - ${post.content}`);
    });
  }
}

// ─── Usage ─────────────────────────

const user1 = new User("Elijah", "U001");

const post1 = new Post("My First Post", "Hello world!");
const post2 = new Post("Second Post", "Learning OOP");

post1.createPost();
post2.createPost();

user1.createPost(post1);
user1.createPost(post2);

user1.viewPosts([post1, post2]);

post1.editPost("Updated content");

Post.countPosts();

console.log(`Total users: ${User.totalUsers}`);