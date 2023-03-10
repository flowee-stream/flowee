export default function DefaultAvatar({ size, username, font }) {
    return (
        <div style={{width: size + 'px', minHeight: size + 'px' }} className="bg-orange-400 rounded-full flex justify-center items-center border-[5px] border-[#70676a]">
            <span style={{fontSize: font + 'px'}} className="font-medium unselectable">{username[0].toUpperCase()}</span>
        </div>
    )
}