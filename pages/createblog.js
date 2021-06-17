import classes from "../styles/createblog.module.css";
import Navigation from "../components/navigation";
import React, { useRef } from "react";
import {useRouter} from "next/router";
 
function CreateBlog(){

    const router = useRouter();
    

    const blogTitle = useRef();
    const blogContent = useRef();

    async function createDb(event){
        event.preventDefault();

        const enteredTitle = blogTitle.current.value;
        const enteredContent = blogContent.current.value;
        const response = await fetch('/api/newBlog', {
            method: "POST",
            body: JSON.stringify({
                title: enteredTitle,
                content: enteredContent
            }),
            headers:{
                'Content-Type': "application/json"
            }
        })
        
        const data = await response.json();
        console.log(data);
        router.push("/");
    }

    return (
        <div className={classes.custom}>
            <Navigation />
            <div className="container">
                <h1>Compose</h1>
                <form>
                    <div className={"form-group"}>
                        <label htmlFor="title">Title</label>
                        <input ref={blogTitle} className="form-control" type="text" id="title"></input>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="content">Content</label>
                        <textarea ref={blogContent} className="form-control" id="content" rows="8" columns="80"></textarea>
                    </div>
                    <div className={classes.buttonStyle}>
                        <button onClick={createDb} className={"btn btn-dark"}> Compose blog</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;