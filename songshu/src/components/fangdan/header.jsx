import React, {Component} from 'react';
import "../../assets/css/fangdan/index.scss"
import bn from "../../assets/img/banner.jpg"
import {Link} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            remList: []
        }
    }

    async componentDidMount() {
        const data = await this.$axios.get("/api/remList")
        console.log(data.remList)
        this.setState({
            remList: data.remList
        })
    }

    render() {
        return (
            <div className={"indexlist"}>
                <div className = {"banner"}>
                    <img className = {"bn"} src = {bn} alt = "" />
                    <img className = {"manjian"}
                         src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/472ddf516d29401fc7ff4d5cdcdda515.jpg"
                         alt = "" />
                </div>
                <div className = {"youhui"}>
                    <li>
                        <img className = {"yhone"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/d7e09f9abd0c0d7196c761ac2b2fa96c.jpg"
                             alt = "" />
                    </li>
                    <li>
                        <img className = {"yhtwo"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/5985ab764a5b894b1d14e8ec52f9735b.jpg"
                             alt = "" />
                    </li>
                    <li>
                        <img className = {"yhthree"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/f2b4fc7aa0de5cba81a075bd5b7764e1.jpg"
                             alt = "" />
                    </li>
                    <li>
                        <img className = {"yhfour"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/990100831e16f3eb403fa3aeddc52b90.jpg"
                             alt = "" />
                    </li>

                </div>
                <div className = {"banner-two"}>
                    <img
                        src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/1a4e5de62be2eb4ffc902094affb3c4d.jpg"
                        alt = "" />
                </div>
                <div className = {"product"}>
                    {
                        this.state.remList.map((v) => {
                            return <Link to={"/ProductInfo/"+v._id+".html"} key = {v._id} >
                                <img src = {v.picture} alt = "" />
                            </Link>
                        })
                    }
                </div>
            </div>
        );
    }


}

export default Header;