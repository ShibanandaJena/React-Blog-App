import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                const fetchedPost = await appwriteService.getPost(slug);
                if (fetchedPost) setPost(fetchedPost);
                else navigate("/");
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/");
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative w-full flex justify-center mb-4 border rounded-xl overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
                </div>
                <div className="prose max-w-full">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;
