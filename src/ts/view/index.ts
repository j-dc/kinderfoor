import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF} from '@fortawesome/free-brands-svg-icons'

import Html from '../lib/Html';




const kfDate = new Date(2024,8,15);
const now = new Date();

const _format = new Intl.DateTimeFormat('nl-BE', { weekday:'long', year: "numeric", month: "long", day: "numeric" });
const _kfDateHr =_format.format(kfDate);

const _kfDateShort = Intl.DateTimeFormat('nl-BE',{ day:'numeric', month:"long"}).format(kfDate);


const _oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const _kfCountdown = Math.round(Math.abs((kfDate.getTime() - now.getTime()) / _oneDay));

Html.qsa('.kfDate').forEach((el)=>{   el.innerHTML = _kfDateHr;});
Html.qsa('.kfCountdown').forEach((el)=>{   el.innerHTML = `${_kfCountdown}`;});
Html.qsa('.kfDateShort').forEach((el)=> el.innerHTML = _kfDateShort);



// We are only using the user-astronaut icon
library.add(faStar,faInstagram,faFacebookF, faEnvelope)

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch()