const fs = require("fs");

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

const file = "posts.json";

// Load existing posts
let posts = [];

if (fs.existsSync(file)) {
  const data = fs.readFileSync(file);
  posts = JSON.parse(data);
}

// Add post
if (command === "add") {
  const newPost = {
    title: title,
    content: content,
  };

  posts.push(newPost);

  fs.writeFileSync(file, JSON.stringify(posts, null, 2));

  console.log("Post added!");
} else if (command === "list") {
  console.log("All Posts:");

  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title} - ${post.content}`);
  });
} else {
  console.log("Unknown command");
}