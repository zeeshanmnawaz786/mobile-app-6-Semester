import { blogSchema } from "../models/blog.js";

const registerBlog = (req, res) => {
  const { title, description, author, date, category } = req.body;

  const user = new blogSchema({
    title,

    description,
    author,
    date,
    category,
  });

  user
    .save()
    .then((savedBlog) => {
      console.log("Blog registered:", savedBlog);
      res.json({ message: "Blog registered successfully", data: savedBlog });
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register blog" });
    });
};

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogSchema.find({});

    res.json({
      allBlogs: allBlogs,
    });
  } catch (error) {
    console.error("Error finding blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// http://localhost:8000/api/updateBlog?_id=6547b6e02f3467ddc8364588
// const updateBlog = (req, res) => {
//   const blogId = req.params.id;
//   const { title, description, category } = req.body;

//   blogSchema.findOneAndUpdate(
//     blogId,
//     {
//       title,
//       description,
//       category,
//     },
//     { new: true },
//     (error, updatedBlog) => {
//       if (error) {
//         console.error("Error updating blog:", error);
//         res.status(500).json({ message: "Failed to update blog" });
//       } else {
//         if (!updatedBlog) {
//           return res.status(404).json({ message: "Blog not found" });
//         }

//         console.log("Blog updated:", updatedBlog);
//         res.json({ message: "Blog updated successfully", data: updatedBlog });
//       }
//     }
//   );
// };

const updateBlog = (req, res) => {
  const id = req.query._id;
  const updatedTeacher = req.body;

  blogSchema.findOneAndUpdate(
    { _id: id },
    updatedTeacher,
    { new: true },
    (error, updatedBlog) => {
      if (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Failed to update blog" });
      } else {
        if (!updatedBlog) {
          return res.status(404).json({ message: "Blog not found" });
        }

        console.log("Blog updated:", updatedBlog);
        res.json({ message: "Blog updated successfully", data: updatedBlog });
      }
    }
  );
};

// http://localhost:8000/api/deleteBlog?_id=6547b6e02f3467ddc8364588
const deleteBlog = (req, res) => {
  const blogId = req.query._id;
  console.log("🚀 ~ file: blog.js:92 ~ deleteBlog ~ blogId:", blogId);

  blogSchema.findOneAndDelete({ _id: blogId }, (error, deletedBlog) => {
    if (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Failed to delete blog" });
    } else {
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      console.log("Blog deleted:", deletedBlog);
      res.json({ message: "Blog deleted successfully", data: deletedBlog });
    }
  });
};

export { registerBlog, getAllBlogs, updateBlog, deleteBlog };
