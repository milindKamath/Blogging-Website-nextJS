import {useRouter} from "next/router"
import classes from "../styles/navigation.module.css"
import Navigation from "../components/navigation";
import {MongoClient, ObjectId} from "mongodb";

function navigateID(props){

    const router = useRouter();
    
    const aboutTitle = "About us";
    const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

    const contactTitle = "Contact us";
    const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."

    const nid = router.query.navID;

    // console.log("Hmm:" + props.blog.title, props.blog.content);

    let title = "";
    let content = "";

    if (nid === "about"){
        title = aboutTitle;
        content = aboutContent;
    }else if(nid === "content"){
        title = contactTitle;
        content = contactContent
    }else{
        title = props.blog.title;
        content = props.blog.content;
    }


    return (
        <div>
        <Navigation />
        <div className={classes.containerStyle}>
            <div className={"container"}>
            <h5> {title}</h5>
            <p> {content} </p>
            </div>
        </div>
        </div>
     );
}

export async function getStaticPaths(){

    const client = await MongoClient.connect("mongodb://localhost:27017/nextblog");

    const db = client.db();

    const blogC = db.collection("blogs");

    const blogIDs = await blogC.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: blogIDs.map(bid =>({
            params: {navID: bid._id.toString()}
        }))
    }
}

export async function getStaticProps(context){

    const blogID = context.params.navID;

    const client = await MongoClient.connect("mongodb://localhost:27017/nextblog");

    const db = client.db(); 

    const blogC = db.collection("blogs");

    const result = await blogC.findOne({_id: ObjectId(blogID)});

    console.log("The result is:" + result);

    client.close();

    return {
        props:{
            blog: {
                id: result._id.toString(),
                title: result.title,
                content: result.content 
            },
        },
    };
}

export default navigateID;