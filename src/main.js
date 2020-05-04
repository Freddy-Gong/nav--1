const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'G', url: 'https://github.com/' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const simplify = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('.com', '').replace(/\/.*/, '')
}


const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {

        const $li = $(`<li>
                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${simplify(node.url)}</div>
                            <div class="close">
                            <svg class="icon2">
                                    <use xlink:href="#icon-close"></use>
                                </svg>
                            </div>
                        </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => { window.open(node.url) })
        $li.on('click', '.close', (e) => {
            console.log('这里')
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({ logo: simplify(url)[0].toUpperCase(), url: url })
        render()
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}