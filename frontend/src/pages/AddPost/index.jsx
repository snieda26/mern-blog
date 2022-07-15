import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useRef } from "react";
import instanceAPI from "../../api/instance";

export const AddPost = ({ isEditing }) => {
  const { isAuth, data } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState({
    title: "",
    text: "",
    tags: "",
    imageUrl: ""
  });

  const urlParams = useParams()
  const navigate = useNavigate()


  const inputRef = useRef(null)

  const handleChangeImage = async (event) => {
    const choosenImage = event.target.files[0]
    const formData = new FormData()
    await formData.append('image', choosenImage)
    const { data } = await instanceAPI.post('/uploads', formData)
    setFields(prev => ({ ...prev, imageUrl: data.url }));
  }

  const onChange = React.useCallback((field, value) => {
    setFields(prev => ({ ...prev, [field]: value }));
  }, []);

  const onSubmit = async (postData) => {
    const res = isEditing ?
      await instanceAPI.patch(`/posts/${urlParams.id}`, postData).then(res => res) :
      await instanceAPI.post('/posts', { ...postData, userId: data._id }).then(res => res)

    navigate(`/posts/${res.data._id}`)
  }


  // const onSubmit = async (postData) => {
  //   setIsLoading(true)
  //   const res = await instanceAPI.patch(`/posts/${urlParams.id}`, { ...postData, userId: data._id })

  //   console.log(res)
  // }


  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text here .... ",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );



  useEffect(() => {
    if (urlParams.id) {
      instanceAPI.get(`/posts/${urlParams.id}`).then(({ data }) => {
        const doc = data._doc
        setFields({
          text: doc.text,
          title: doc.title,
          imageUrl: doc.imageUrl,
          tags: doc.tags.join(',')
        })
      })
    }
  }, [])


  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }




  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={() => inputRef.current.click()}>
        Apload image
      </Button>
      <input type="file" onChange={handleChangeImage} hidden ref={inputRef} />
      {fields.imageUrl && (
        <Button variant="contained" color="error">
          Delete
        </Button>
      )}
      {fields.imageUrl && (
        <img className={styles.image} src={`http://localhost:3001${fields.imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Enter title..."
        value={fields.title}
        onChange={(e) => onChange("title", e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        onChange={(e) => onChange("tags", e.target.value)}
        value={fields.tags}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={fields.text}
        onChange={(value) => onChange("text", value)}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={() => onSubmit({ text: fields.text, title: fields.title, tags: fields.tags, imageUrl: fields.imageUrl })}>
          {isEditing ? "Save Changes" : "Post"}
        </Button>
        <Button size="large">Cancel</Button>
      </div>
    </Paper>
  );
};
