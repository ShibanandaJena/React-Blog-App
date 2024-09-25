import React, { useEffect, useState } from 'react'
import { Container,PostForm } from '../components/index'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [post,setPosts]=useState(null)
    const {} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])

    return post ? (
        <div className="py-8 bg-gray-50 min-h-screen">
            <Container>
                <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost