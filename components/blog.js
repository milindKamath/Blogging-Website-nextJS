import Link from "next/link";
import classes from "../styles/navigation.module.css"

function Blog(props){

    const truncatedContent = props.content.substring(0, 100);

    const dots = "..."

    const content = truncatedContent + dots

    return (
        <div className={classes.containerStyle}>
            <div className={"container"}>
                <h5> {props.title}</h5>
                <p> {props.content.length < 100 ? props.content : <> {content} <Link href= {"/" + props.id}> Read More</Link></>}</p>
            </div>
        </div>
    )
}

export default Blog;