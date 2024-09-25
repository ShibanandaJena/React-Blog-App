import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components/index';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Login to read posts
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-4 bg-white rounded-lg shadow-md">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
