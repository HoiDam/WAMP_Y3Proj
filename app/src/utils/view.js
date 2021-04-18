const Realtime = ()=>{

    return (
        <div>
            <div><iframe src="https://widget.coinlib.io/widget?type=chart&amp;theme=light&amp;coin_id=859&amp;pref_coin_id=1505" width="100%" height="536px" frameborder="0" marginwidth="0" marginheight="0" scrolling="auto"></iframe></div>
            <div><a href="https://coinlib.io" target="_blank">Cryptocurrency Prices</a>&nbsp;by Coinlib</div>
        </div>
    )
}

const News =()=>{
    return (
        <div>
            <iframe scrolling="no" allowtransparency="true" src="https://cryptopanic.com/widgets/news/?bg_color=FFFFFF&amp;font_family=sans&amp;header_bg_color=30343B&amp;header_text_color=FFFFFF&amp;link_color=0091C2&amp;news_feed=recent&amp;text_color=333333&amp;title=Latest%20News" width="100%" height="500px" frameborder="0"></iframe>
        </div>
    )
}

export {Realtime,News}