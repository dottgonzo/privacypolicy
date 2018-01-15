interface IPrivacyOptions {
  localStorageName?: string
  text?: string
  domName?: string
  vPosition?: string
  backgroundColor?: string
  textColor?: string
  acceptOnScroll?: string
  domAttachId?: string
  pplink?: string
}

interface IOwner {
  title:string
  fullName:string
  email?:string
  phone?:string
  cfiva?:string
  address?:string
  city?:string
  cap?:string
  province?:string
}

declare const window: Window

declare const document: Document



export class PrivacyPolicy {


  opts: IPrivacyOptions

  constructor(opts?: IPrivacyOptions) {
    console.log('jj')
    if (!opts) opts = {}

    if (!opts.localStorageName) opts.localStorageName = '_privacyPolicyAccepted'
    if (!opts.domName) opts.domName = 'privacyPolicy'
    if (!opts.backgroundColor) opts.backgroundColor = 'white'
    if (!opts.vPosition) opts.vPosition = 'bottom'
    if (!opts.textColor) opts.textColor = 'black'


    this.opts = opts

  }
  check() {


    const opts = this.opts

    const lstore = window.localStorage



    if (lstore.getItem(opts.localStorageName)) return true



    const domElPolicyLink = document.createElement("a")
    domElPolicyLink.href = opts.pplink
    domElPolicyLink.target = '_blank'
    domElPolicyLink.appendChild(document.createTextNode("clicca quì"))



    const domElPolicyAccept = document.createElement("a")
    domElPolicyAccept.href = 'javascript:window.acceptpolicy()'
    domElPolicyAccept.onclick = window['acceptpolicy']
    domElPolicyAccept.appendChild(document.createTextNode("ACCETTA"))


    const domEl = document.createElement("div")
    domEl.id = opts.domName



    domEl.style.position = 'fixed'
    domEl.style.width = '100%'
    domEl.style.display = 'block'
    domEl.style.zIndex = '100000'
    domEl.style.backgroundColor = opts.backgroundColor
    domEl.style.color = opts.textColor
    domEl.style.padding = '10px'


    switch (opts.vPosition) {
      case 'bottom':
        domEl.style.bottom = '0px'
        domEl.style.borderTop= '1px solid black'

      }



    const text1 = document.createTextNode("Su questo sito utilizziamo cookie tecnici e, previo tuo consenso, cookie di profilazione.\u00A0")
    const text2 = document.createTextNode("Se vuoi saperne di più\u00A0")



    domEl.appendChild(text1)
    domEl.appendChild(text2)
    domEl.appendChild(domElPolicyLink)
    let text3
    if (opts.acceptOnScroll) {
      text3 = document.createTextNode("\u00A0Cliccando in un punto qualsiasi dello schermo, effettuando un’azione di scroll, presti il consenso all’uso di tutti i cookie.\u00A0")
      domEl.appendChild(text3)
    } else {
      text3 = document.createTextNode("\u00A0Per prestare il consenso all’uso di tutti i cookie clicca quì \u00A0")
      domEl.appendChild(text3)
    }
    domEl.appendChild(domElPolicyAccept)


    if (opts.domAttachId) {
      document.getElementById(opts.domAttachId).appendChild(domEl)
    } else {
      document.body.appendChild(domEl)
    }

    window['acceptpolicy'] = () => {
      lstore.setItem(opts.localStorageName, "ok")
      document.getElementById(opts.domName).remove()
    }

    if (opts.acceptOnScroll) {
      window.onscroll = function () { window['acceptpolicy']() };
    }

  }
  show(nodeId: string, owner:IOwner) { // TODO: all

    const domEl = document.createElement("div")

    const title = document.createElement("h1")
    title.appendChild(document.createTextNode("Privacy Policy"))

    const subtitle = document.createElement("h2")
    subtitle.appendChild(document.createTextNode(owner.title))


    domEl.appendChild(title)
    domEl.appendChild(subtitle)

    document.getElementById(nodeId).appendChild(domEl)
  }
}