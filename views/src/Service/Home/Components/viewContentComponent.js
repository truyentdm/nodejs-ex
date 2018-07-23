import React,{Component} from "react"
import { Link, BrowserRouter as Router, Route, Redirect ,Switch } from "react-router-dom"
import IndexWeb from "../Pages/web/indexWeb"
import IndexMobile from "../Pages/app/indexMobile"
import IndexPublish from "../Pages/publish/indexPublish"
import "../Styles/viewContentComponent.css"
import "../Styles/viewContentComponentResponsive.css"
import "../Styles/video.css"

const MyMenu = ({label,to,activeOnlyWhenExact=false})=>{
    return (
        <Route path={to} exact = {activeOnlyWhenExact} children= {({match})=>{
            let active = match ? "active" : "";
            return (
                <li class={active}><Link to={to}>{label}</Link></li>
            );
        }}
        />
    );
}

class ViewContent extends Component{
    componentDidMount() {
        var canvasVideo = new CanvasVideoPlayer({
			videoSelector: '.js-video',
			canvasSelector: '.js-canvas',
			timelineSelector: '.js-timeline',
			audio: false,
			loop: false
		});
		canvasVideo.play();
    }
    render(){
        return(
            <Router>
            <div id="wp_content">
                <div id="intro">
                    <div class="video">
                        <div class="video-responsive">
                            <video class="video js-video" muted>
                                <source src="/media/big_buck_bunny.webm" type="video/webm"/>
                                <source src="/media/big_buck_bunny.mp4" type="video/mp4"/>
                                <source src="/media/big_buck_bunny.ogv" type="video/ogg"/>
                                Your browser does not support HTML5 video.
                            </video>
            
                            <canvas class="canvas js-canvas"></canvas>
                        </div>
                        <div class="video-timeline js-timeline">
                            <div class="video-timeline-passed js-timeline-passed">
                            </div>
                        </div>
                    </div>
                    <div class="layer"></div>
                    <div id="main_search">
                        <div class="box_search">
                        <h2>TDM Education Online</h2>
                        <p>We don't make electronic document, We only make education interesting</p>
                        <form name="frmSearch">
                            <div class="input-group">
                            <input type="text" name="keyword" placeholder="Đăng ký nhận thông tin (example@mail.com)"/>
                            {/* <button name="btnSearch" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button> */}
                            </div>
                        </form>
                        <div class="group">
                            <a href="#" class="btn btn-success" style={{"margin-right": "10px"}}>Đăng ký</a>
                            <a href="#" class="btn btn-info">Giới thiệu</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="view_left" class="container clearfix">
                <ul id="menu_view">	
                    <MyMenu label="WEB" to="/web" />
                    <MyMenu label="App Mobile" to="/mobile" />
                    <MyMenu label="Cộng đồng" to="/publish" />
                </ul>
                <div id="wp_view_home">
                <Switch>
                    <Route path="/web" component={IndexWeb}/>
                    <Route path="/mobile" component={IndexMobile}/>
                    <Route path="/publish" component={IndexPublish}/>
                    <Route component={()=>{
                        return <Redirect from="/" to="/web" />
                    }}/>
                </Switch>
                </div>
            </div>
          </div>
          </Router>
        );
    }
}
export default ViewContent;