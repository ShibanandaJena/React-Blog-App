import React from 'react';
import { Container, PostForm } from '../components/index';

const AddPost = () => {
    return (
        <div className="py-8 bg-gray-50 min-h-screen">
            <Container>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
                    <PostForm />
                </div>
            </Container>
        </div>
    );
};

export default AddPost;
