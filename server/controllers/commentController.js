import Product from "../models/product.js";

class CommentController {
  constructor() {}

  static async insertComment(req, res) {
    try {
      const userId = req.userId;
      const productId = req.body.productId;
      if (!productId) return res.sendStatus(404);
      const comment = req.body.comment;
      if (!comment) return res.sendStatus(401);

      const product = await Product.findById(productId);
      if (!product) return res.sendStatus(401);

      product.comments.push({
        commentBy: userId,
        comment: comment,
        commentAt: new Date(),
      });

      await product.save();

      res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getComments(req, res) {
    try {
      const productId = req.params.id;
      if (!productId) return res.sendStatus(401);
      const product = await Product.findById(productId)
        .populate({
          path: "comments",
          populate: {
            path: "commentBy",
            select: "firstName lastName picture",
          },
        })
        .exec({});
      const filterdComments = product.comments.map((comment) => {
        return {
          comment: comment.comment,
          commentBy: comment.commentBy,
          commentAt: comment.commentAt,
          like: {
            count: comment.like.count,
          },
          disLike: {
            count: comment.disLike.count,
          },
          _id: comment._id,
        };
      });
      res.json(filterdComments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async likeComment(req, res) {
    try {
      const userId = req.userId;

      const { productId, commentId } = req.query;

      if (!productId || !commentId) return res.sendStatus(401);

      const product = await Product.findById(productId);

      if (!product)
        return res.status(404).json({ message: "product not found" });

      const comments = product.comments.find((comment) => {
        return comment._id.toString() === commentId;
      });

      if (!comments)
        return res.status(404).json({ message: "comment not found" });

      let likers = comments.like.likers.length;
      let disLikers = comments.disLike.disLikers.length;
      comments.like.likers = comments.like.likers.filter((like) => {
        return like.toString() !== userId;
      });

      if (likers > comments.like.likers) {
        comments.like.count -= 1;
      } else {
        comments.disLike.disLikers = comments.disLike.disLikers.filter(
          (disLike) => {
            return disLike.toString() !== userId;
          }
        );
        if (disLikers > comments.disLike.disLikers) {
          comments.disLike.count -= 1;
          comments.like.count += 1;
          comments.like.likers.push(userId);
        } else {
          comments.like.likers.push(userId);
          comments.like.count += 1;
        }
      }
      console.log(comments.like.likers);

      product.save();

      res.status(201).json(comments.like.count);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async disLikeComment(req, res) {
    try {
      const userId = req.userId;

      const { productId, commentId } = req.query;

      if (!productId || !commentId) return res.sendStatus(401);

      const product = await Product.findById(productId);

      if (!product)
        return res.status(404).json({ message: "product not found" });

      const comments = product.comments.find((comment) => {
        return comment._id.toString() === commentId;
      });

      if (!comments)
        return res.status(404).json({ message: "comment not found" });

      let likers = comments.like.likers.length;
      let disLikers = comments.disLike.disLikers.length;
      comments.disLike.disLikers = comments.disLike.disLikers.filter(
        (disLike) => {
          return disLike.toString() !== userId;
        }
      );

      if (disLikers > comments.disLike.disLikers) {
        comments.disLike.count -= 1;
      } else {
        comments.like.likers = comments.like.likers.filter((like) => {
          return like.toString() !== userId;
        });
        if (likers > comments.like.likers) {
          comments.like.count -= 1;
          comments.disLike.count += 1;
          comments.disLike.disLikers.push(userId);
        } else {
          comments.disLike.disLikers.push(userId);
          comments.disLike.count += 1;
        }
      }

      product.save();

      res.status(201).json(comments.disLike.count);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default CommentController;
