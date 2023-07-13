import { BsGithub,BsTwitter,BsFacebook } from "react-icons/bs";

export default function Footer() {
    return ( 
            <footer className="flex flex-col justify-between w-9/12 gap-3 mb-3 mx-auto">
                <span className="text-center">&copy; 2023 M.V.Gott</span>
                <ul className="flex flex-row justify-between">
                    <li> <a href="https://github.com/ValeGottardello"><BsGithub/></a> </li>
                    <li> <a href="https://twitter.com"><BsTwitter/></a></li>
                    <li> <a href="https://facebook.com"><BsFacebook/></a></li>
                </ul>
            </footer>
    )
}