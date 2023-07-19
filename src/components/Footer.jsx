import { BsGithub,BsTwitter,BsFacebook } from "react-icons/bs";

export default function Footer() {
    return ( 
        <div className="sticky bottom-0 bg-slate-700">
            <footer className="flex flex-col justify-between  gap-3 mx-auto w-full px-4 pb-2">
                <span className="text-center text-yellow-600">&copy; 2023 M.V.Gott</span>
                <ul className="flex flex-row justify-between">
                    <li> <a href="https://github.com/ValeGottardello" className="text-yellow-600"><BsGithub/></a> </li>
                    <li> <a href="https://twitter.com" className="text-yellow-600"><BsTwitter/></a></li>
                    <li> <a href="https://facebook.com" className="text-yellow-600"><BsFacebook/></a></li>
                </ul>
            </footer>
        </div>
    )
}