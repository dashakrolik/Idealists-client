/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { baseUrl } from '../../constants';
import { useState } from 'react';
import Button from '../reogranisation/Questions/Button';
import {  Link } from 'react-router-dom';
import request from 'superagent';

export default function CofounderProfileVideo(props) {
	const [ previewSource, setPreviewSource ] = useState('');
	const [ successMsg, setSuccessMsg ] = useState(false);
	const [ videos, setVideos ] = useState();
	const [ loading, setLoading ] = useState(false);
	const handelVideoInputChange = (e) => {
		const video = e.target.files[0];
		previewVideo(video);
	};

	const previewVideo = (video) => {
		const reader = new FileReader();
		reader.readAsDataURL(video);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};
	const uploadVideo = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', previewSource);
		data.append('upload_preset', 'cofounderProfileVideo');
		setLoading(true);
		setPreviewSource(false);
		let file 
		await request
			.post('https://api.cloudinary.com/v1_1/idealists/video/upload')
			.send(data)
			.then((res)=> {
				if (res.status === 200) {
					file = JSON.parse(res.text)		
				}
			})
			.catch((err) => {
				if (err.status === 409) {
					alert('User with this email already exists');
				} else {
					console.error(err);
				}
			});		    
		setPreviewSource(!previewSource);		
		setLoading(false);
		setVideos({ video: file.secure_url });
		updateVideoURL({ video: file.secure_url })	
		setSuccessMsg(true);			 
	};
	const cancelVideo = (e) => {
		e.preventDefault();
		setPreviewSource(false);
		document.getElementById('upload_file').value = '';
	};

	const updateVideoURL =  async(videoURL) => {			
		await request
			.put(`${baseUrl}/users`)
			.set('Authorization', 'Bearer ' + props.authState.token)
			.set('Content-Type', 'application/json')
			.send(
				JSON.stringify(videoURL)
			)
			.then((res) => {
				if (res.status === 200) {
					
				}
			})
			.catch((err) => {
				if (err.status === 409) {
					alert('User with this email already exists');
				} else {
					console.error(err);
				}
			});		
	};
	return (
		<div>
			<Container>
				{successMsg ? (
					<div>
						<LeftSide>
							<h3>Thank you. Your profile video was submitted succesfully.</h3>
						</LeftSide>
					</div>
				) : (
					<div>
						<LeftSide>
							<div>
								<h3>1.Upload a short (max 3 minutes) video,<br></br>
									  explaining who you are and why you <br></br>
									  want to be an impactful co-founder</h3>
							</div>
						</LeftSide>
						<RightSide>
							<form onSubmit={uploadVideo}>
								<label>
									{' '}
									<h3>Profile Video</h3>
								</label>
								<input
									id='upload_file'
									type='file'
									required
									name='video'
									accept='video/mp4,video/x-m4v,video/*'
									onChange={handelVideoInputChange}
								/>
								{loading && <h3 style={{ paddingLeft: '50px' }}>Loading...</h3>}
								<br />
								
								<button type='submit'>Upload</button>
								<div style={{
											paddingRight:'90px',
											}}>
								<button  onClick={cancelVideo}>Cancel</button>
								</div>
								<br />
								{previewSource.length > 10 && (
									<div
										style={{
											height: '100px',
											width: '100px',
											paddingTop: '50px',
											paddingLeft: '50px'
										}}>
										{previewSource && (
											<video width='200px' height='100px' controls>
												<source src={previewSource} />
												Your browser does not support HTML5 video.
											</video>
										)}
									</div>
								)}
							</form>
						</RightSide>
					</div>
				)}
				<div
					css={css`
						position: absolute;
						right: 100px;
						bottom: 100px;
						width: 160px;
					`}>
					{videos && (
						<Link to='/cofounderPersonalityTest'>
							<Button color='inherit' text='Next' disabled='' onClick='' />
						</Link>
					)}
				</div>
			</Container>
		</div>
	);

  
}

const LeftSide = styled.div`
	position: absolute;
	color: #ffffff;
	top: 47%;
	left: 50%;
	width: 400px;
	height: 300px;
	margin-left: -360px;
	margin-top: -150px;
	padding-top: 10px;
	

	h3 {
		display: block;
		position: relative;
		left: 47px;
		width: 80%;
		font-size: 16px;
		font-weight: 500;
		padding: 5px;
		margin: 50px 5px 5px;
	}

	p {
		display: block;
		position: relative;
		left: 47px;
		top: 10px;
		width: 80%;
		font-size: 10px;
		font-weight: 300;
		padding: 5px;
		margin: 5px;
	}

	a {
		font-weight: 800;
		&:hover {
			cursor: pointer;
			color: #dfeff2;
		}
	}
`;

const RightSide = styled.div`
	position: absolute;
	//color: #ffffff;
	top: 50%;
	left: 52%;
	width: 300px;
	height: auto;
	padding-top: 10px;
	padding-bottom: 20px;
	margin-left: 0px;
	margin-top: -150px;
	border-radius: 6px;
	box-shadow: 2px 2px 23px 0px rgba(37, 37, 37, 0.39);
	background-color: rgba(255, 255, 255, 0.9);
	color: #233949;

	label {
		display: block;
		position: relative;
		left: 10%;
		width: 80%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #233949;
		padding: 0;
		margin: 0;
		border-radius: 10px;
		border-color: transparent;
		outline: none;
		-webkit-appearance: none;
	}

	input {
		display: block;
		position: relative;
		left: 10%;
		width: 80%;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
		color: #233949;
		border-radius: 6px;
		border-color: transparent;
		padding: 6px;
		outline: none;
		-webkit-appearance: none;
	}

	button {
		display: inline-block;
		position: relative;
		float: right;
		right: 10%;
		width: 25%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #233949;
		border-radius: 6px;
		border-color: transparent;
		outline: none;
		-webkit-appearance: none;
		background-color: #dfeff2;
		transition: all 100ms ease-in-out;

		&:hover {
			color: white;
			background-color: #4cc5f1;
			cursor: pointer;
		}
	}

	a {
		display: inline-block;
		position: relative;
		float: left;
		left: 10%;
		margin-right: 5px;
		height: 30px;
		line-height: 30px;
		font-size: 10px;
		color: #233949;
		outline: none;
		-webkit-appearance: none;
		transition: all 100ms ease-in-out;

		&:hover {
			cursor: pointer;
			color: #1a3d7c;
		}
	}
`;

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
`;
