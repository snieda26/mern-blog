import React, { useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import instanceAPI from "../api/instance";
import ReactMarkdown from 'react-markdown'


export const FullPost = () => {
  const { id } = useParams()

  const [data, setData] = useState([])
  const [isPostLoading, setPostLoading] = useState(true)

  useEffect(() => {
    instanceAPI.get(`/posts/${id}`).then(({ data }) => setData(data._doc)).then(res => setPostLoading(false))
  }, [])

  console.log(data)

  if (isPostLoading) {
    return <Post isLoading={isPostLoading} />
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:3001${data.imageUrl}` : ''}
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullName: data.user.fullName,
        }}
        createdAt={data.updatedAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount || 0}
        tags={["react", "fun", "typescript"]}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={isPostLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
