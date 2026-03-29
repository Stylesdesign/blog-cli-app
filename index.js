const fs = require("fs");
const readline = require("readline");

const file = "posts.json";

// Load posts
let posts = [];
if (fs.existsSync(file)) {
  posts = JSON.parse(fs.readFileSync(file));
}

// Setup CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\n=== Blog CLI ===");
  console.log("1. Create Post");
  console.log("2. View Posts");
  console.log("3. Edit Post");
  console.log("4. Delete Post");
  console.log("5. Exit");

  rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice) {
  switch (choice) {
    case "1":
      createPost();
      break;
    case "2":
      viewPosts();
      break;
    case "3":
      editPost();
      break;
    case "4":
      deletePost();
      break;
    case "5":
      rl.close();
      break;
    default:
      console.log("Invalid choice");
      showMenu();
  }
}

function savePosts() {
  fs.writeFileSync(file, JSON.stringify(posts, null, 2));
}

function createPost() {
  rl.question("Enter title: ", (title) => {
    rl.question("Enter content: ", (content) => {
      posts.push({ title, content });
      savePosts();
      console.log("Post created!");
      showMenu();
    });
  });
}

function viewPosts() {
  console.log("\nAll Posts:");
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title} - ${post.content}`);
  });
  showMenu();
}

function editPost() {
  viewPosts();
  rl.question("Enter post number to edit: ", (num) => {
    const index = num - 1;

    if (posts[index]) {
      rl.question("New title: ", (title) => {
        rl.question("New content: ", (content) => {
          posts[index] = { title, content };
          savePosts();
          console.log("Post updated!");
          showMenu();
        });
      });
    } else {
      console.log("Invalid post");
      showMenu();
    }
  });
}

function deletePost() {
  viewPosts();
  rl.question("Enter post number to delete: ", (num) => {
    const index = num - 1;

    if (posts[index]) {
      posts.splice(index, 1);
      savePosts();
      console.log("Post deleted!");
    } else {
      console.log("Invalid post");
    }
    showMenu();
  });
}

// Start app
showMenu();