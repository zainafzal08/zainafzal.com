import * as React from "react";
import "./AboutPage.css";
import { AboutIcon } from "../Icons/AboutIcon";
import { GithubIcon } from "../Icons/GithubIcon";
import { MailIcon } from "../Icons/MailIcon";
import { JobIcon } from "../Icons/JobIcon";

export function AboutPage() {
    const image1 = new URL('../../assets/about_1.jpg', import.meta.url);
    const image2 = new URL('../../assets/about_2.png', import.meta.url);
    const image3 = new URL('../../assets/about_3.jpg', import.meta.url);
    return <div className="fill start">
        <div className="hero" id="about-hero">
            <AboutIcon/>
            <h1 className="inter-bold bump-up"> About </h1>
        </div>
        <div className="content center">
            <div className="image-grid">
                <img src={image1.href} />
                <img src={image2.href} />
                <img src={image3.href} />
            </div>
            <div className="detail-card card">
                <h1> Who's Zain </h1>
                <p>I am a software engineer based out of Sydney Australia, specialising in frontend web development but generally interested in all things computing with a smattering of interest in cell biology :) I’m currently at Qwilr but i’ve worked at Google, Akuna Capital & UNSW.</p>
                <hr/>
                <div className="push-right">
                   <a className="link" href="/career">
                        <JobIcon/>
                        <span className="inter">Career</span>
                   </a> 
                   <a className="link" href="https://github.com/zainafzal08">
                        <GithubIcon/>
                        <span className="inter">Github</span>
                   </a> 
                   <a className="link" href="mailto:zain.afz@gmail.com">
                        <MailIcon/>
                        <span className="inter">Email</span>
                   </a>
                </div>
            </div>
        </div>
    </div>
}