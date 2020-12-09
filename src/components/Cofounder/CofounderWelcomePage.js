/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from '../reogranisation/Questions/Button';
import posed from 'react-pose';

const CofounderWelcomePage = (props) => {
	const startProfile = () => {
		if (props.authState.loggedIn) {
			props.history.push('/CofounderProfileVideo');
		}
	};

	return (
		<Container>
			<Global
				styles={css`
					body {
						background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
					}
				`}
			/>
			<Content>
				<div css={css`grid-area: content-area;`}>
					<div
						css={css`
							display: flex;
							align-items: center;
							flex-direction: column;
						`}>
						<StartContent
							// pose={uiState}
							css={css`
								display: flex;
								flex-direction: column;
								width: auto;
								margin-bottom: 60px;
							`}>
							<Heading css={css`@media only screen and (orientation: portrait) {margin-top: 60px;}`}>
								Welcome to our co-founder platform!
							</Heading>
							<Paragraph>To complete your profile, you’ll now go through 3 steps:</Paragraph>
							<Paragraph>
								1. Upload a short (max 3 minutes) video, explaining who you are and why you want to be
								an impactful co-founder <br />
								2. Take a personality test <br />
								3. Fill out the blanks on your profile, by answering a few simple questions
							</Paragraph>
							<Paragraph>
								As soon as your profile is complete, we’ll take a look at it.<br /> Once you get
								approved,you’ll be able to see all the validated ideas and get to show your interest in
								them.<br /> After this, with the help of our matchmaker, you’ll look for a co-founder
								and try to find the perfect match. <br /> Next up, you’ll get to select up to 3 mentors
								and off you go to the funding phase.<br /> When the funding has been closed
								successfully, your journey as an impactful co-founder begins!
							</Paragraph>
							<Paragraph>Good luck!</Paragraph>
							<Controls
								css={css`
									position: absolute;
									right: 140px;
									bottom: 130px;
									width: 180px;
								`}>
								<Button text='Next' disabled='' onClick={startProfile} />
							</Controls>
						</StartContent>
					</div>
				</div>
			</Content>
		</Container>
	);
};

const PStartContent = posed.div({
	notDisplayingLogin: {
		y: 0,
		opacity: 1.0
	},
	displayingLogin: {
		y: -390,
		opacity: 0.15
	}
});

const StartContent = styled(PStartContent)`
  width: 100%;
`;

const Controls = styled.div`
	justify-content: space-between;
	display: flex;
	flex-direction: row;
`;

const Content = styled.div`
	align-self: center;
	justify-self: center;
	color: #ffffff;
	width: 80vw;
	max-width: 900px;
	height: auto;
	max-height: 500px;
	padding: 20px;
	display: grid;

	@media only screen and (orientation: portrait) {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto;
		grid-template-areas: "logo-area" "content-area";
	}
	@media only screen and (orientation: landscape) {
		grid-template-columns: auto auto;
		grid-template-rows: auto;
		grid-template-areas: "logo-area content-area";
	}
`;

const Heading = styled.div`
	font-size: 30px;
	font-weight: 800;
	margin: 18px 10px 80px 10px;
`;

const Paragraph = styled.div`
	display: block;
	position: relative;
	font-size: 16px;
	font-weight: 400;

	margin: 0 10px 30px;
`;

const Container = styled.div`
	position: fixed;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
	display: flex;
	overflow-y: scroll;
`;

export default CofounderWelcomePage;
