/*
	Angelisium @2019 ~ All right reserved
	2 const : TQSRT and toQueryString
*/

const TQSRT= (a)=> { //To Query String Real Type of
	return Object.prototype.toString.call(a).split(' ').reverse()[0].slice(0,-1);
};

const toQueryString= (a,z)=> {
	z= z?z:0;
	switch(TQSRT(a)) {
		default:
			console.error(`Uncaught TypeError: ${Object.prototype.toString.call(a)} is unknown`);
		case "Null": case "Undefined": case "Function":
			if(z<1) {
				return `null`;
			} return `=null`;
		break;
		case "Number":
			if(z<1) {
				return a;
			} return `=${a}`;
		break;
		case "String":
			if(z<1) {
				return encodeURI(a);
			} return `=${encodeURI(a)}`;
		break;
		case "Array":
			let q= [];
			for(let b=0;b<a.length;b++) {
				let c= toQueryString(a[b], z+1);
				if(TQSRT(c)==="Array") {
					for(let d in c) {
						q.push(`[]${c[d]}`);
					}
				} else {
					q.push(`[]${c}`);
				}
			}
			if(z<1) {
				return q.join('&');
			} return q;
		break;
		case "Object":
			let r= [];
			for(let b=0,c=Object.keys(a);b<c.length;b++) {
				let d= toQueryString(a[c[b]],z+1);
				if(TQSRT(d)==="Array") {
					for(let e=0;e<d.length;e++) {
						r.push(`${(z<1)?c[b]:`[${c[b]}]`}${d[e]}`);
					}
				} else {
					r.push(`${(z<1)?c[b]:`[${c[b]}]`}${d}`);
				}
			}
			if(z<1) {
				return r.join('&');
			} return r;
		break;
	}
};
