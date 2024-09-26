import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from './index'
import appwriteService from "../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) {
  const {register,handleSubmit,
    watch,setValue,control,getValues}=useForm({
      defaultValues:{
        title:post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active'
      },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
      try {
          let file = null;
  
          // Handle file upload only if there is a new file in the form
          if (data.image && data.image[0]) {
              file = await appwriteService.uploadFile(data.image[0]);
  
              // If updating a post and a new file is uploaded, delete the old file
              if (post && post.featuredImage) {
                  await appwriteService.deleteFile(post.featuredImage);
              }
          }
  
          // If we are updating an existing post
          if (post) {
              const updatedPost = await appwriteService.updatePost(post.$id, {
                  ...data,
                  featuredImage: file ? file.$id : post.featuredImage, // Use new file or keep the old one
              });
  
              if (updatedPost) {
                  navigate(`/post/${updatedPost.$id}`);
              } else {
                  throw new Error("Failed to update post.");
              }
          } 
          // If we are creating a new post
          else {
              const newPost = await appwriteService.createPost({
                  ...data,
                  featuredImage: file ? file.$id : undefined, // Set the uploaded image
                  userId: userData.$id,
              });
  
              if (newPost) {
                  navigate(`/post/${newPost.$id}`);
              } else {
                  throw new Error("Failed to create post.");
              }
          }
      } catch (error) {
          console.error("Error submitting post:", error);
      }
  };
  

    const slugTransform = useCallback((value)=>{
      if(value && typeof value === "string"){
          return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");   
      } return ''

    },[])

    useEffect(()=>{
      const subscription = watch((value,{name})=>{
        if(name === 'title'){
          setValue('slug',slugTransform(value.title,
            {shouldValidate: true}
          ))
        }
      })
      return ()=> subscription.unsubscribe()

    },[watch,slugTransform,setValue])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}


export default PostForm;