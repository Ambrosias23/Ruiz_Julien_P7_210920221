
import React,{useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import Post from "../components/Post";

export default function Home(props) {
	const [posts, setPosts] = useState();
	const token = localStorage.getItem("TOKEN");
	const [userLoged, setuserLoged ]= useState(false);
	const isLoggedIn = props.isLoggedIn;

	const Authorization = () =>{
		if (isLoggedIn){
			setuserLoged(!userLoged)	
		}else{
			setuserLoged(userLoged)
		}
		
	}

	useEffect(()=>{
        if(isLoggedIn){
			getAllPost();
		}
    },[]);
	function getAllPost(){
		fetch(`http://localhost:3000/api/posts`, {
			method: 'GET',
			headers: { 
				'Authorization': 'Bearer ' + token}
			
		})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			setPosts(data);
		})
		.catch((err) => {
			console.log(err);
			alert(err);
		});
	}

}
	
	if(isLoggedIn){
	return (
		<div className="body">
			<main>
				<p className="titreHome">BLOG</p>
				<div className="posts">
					{posts && posts.map((post) => (
						<Post
							key={post._id}
							id={post._id}
							title={post.title}
							text={post.text}
							imageUrl={post.imageUrl}
							likes={post.likes}
							dislikes={post.dislikes}
							userName="@moi"
							publishedAt={post.updatedAt}
							avatar=""
						/>
					))}
				</div>
			</main>
		</div>
					);}else{
						Navigate('/signup');
					}

