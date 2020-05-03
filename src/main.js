const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: './logo/guithub.jpg', url: 'https://github.com/' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(node => {
        const $li = $(`<li>
        <a href="${node.url}">
                        <div class="site">
                            <div class="logo">
                                ${node.logo[0]}
                            </div>
                            <div class="link">${node.url}</div>
                        </div>
                    </a>
        </li>`).insertBefore($lastLi)
    })
}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网址')
        if (url.indexOf !== 0) {
            url = 'https://' + url
        }
        hashMap.push({ logo: url[0], logoType: 'text', url: url })
        render()
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}