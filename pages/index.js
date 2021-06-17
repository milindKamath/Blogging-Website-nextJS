import Navigation from "../components/navigation";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";
import Blog from "../components/blog";
import React from "react";
import {MongoClient} from "mongodb";

function Home(props){

    function showBlog(blog){
        return <Blog id={blog.id} key={blog.id} title={blog.title} content={blog.content} />
    }
   
    return( 
        <div>
            <Navigation />
            <HomeContent />
            {/* {props.result.forEach(function(blog){
                <Blog title="hello" content="Hi"/>
            })} */}
            {props.result.map(showBlog)}
            <Footer/>
        </div>
    );
}


export async function getStaticProps(){
    const client = await MongoClient.connect("mongodb://localhost:27017/nextblog");

    const db = client.db();

    const blogC = db.collection("blogs");

    const results = await blogC.find().toArray();

    client.close();

    return {
        props: {
            result: results.map(r =>({
                id: r._id.toString(),
                title: r.title,
                content: r.content
            }))
        }
    };
}

export default Home