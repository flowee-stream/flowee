export default function DefaultAvatar({ size, username, font }) {
    return (
        <div style={{width: size + 'px', height: size + 'px'}} className="bg-orange-400 rounded-full flex justify-center items-center">
            <span style={{fontSize: font + 'px'}} className="font-medium unselectable">{username[0].toUpperCase()}</span>
        </div>
    )
}