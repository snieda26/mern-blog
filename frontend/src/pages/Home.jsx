import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchRemovePost, fetchTags } from "../redux/slices/posts";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

export const Home = () => {
  const dispatch = useDispatch()

  const { posts, tags } = useSelector(state => state.posts)
  const { data } = useSelector(state => state.auth)

  const isPostsLoaded = posts.status === "loaded"
  const isTagsLoaded = tags.status === "loaded"

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())

  }, [])


  console.log('test render')
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoaded ? posts.items : [...Array(5)]).map((obj, ind) => isPostsLoaded ? (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:3001${obj.imageUrl}` : ''}
              user={{
                avatarUrl:
                  "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                fullName: obj.user.fullName,
              }}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={obj.user._id == data?._id}
              isLoading={false}
            />
          ) : (
            <Post
              id={1}
              title="Roast the code #1 | Rock Paper Scissors"
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={{
                avatarUrl:
                  "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                fullName: "Keff",
              }}
              createdAt={"12 june 2022 y."}
              viewsCount={150}
              commentsCount={3}
              tags={["react", "fun", "typescript"]}
              isEditable
              isLoading={true}
            />
          )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
