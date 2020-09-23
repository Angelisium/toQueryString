/*

	Copyright (C) 2019 by Angelisium

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY  OF ANY KIND, EXPRESS OR
	IMPLIED,  INCLUDING  BUT  NOT  LIMITED TO THE WARRANTIES  OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE  AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS  OR  COPYRIGHT  HOLDERS BE LIABLE  FOR  ANY CLAIM,  DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN  CONNECTION WITH  THE SOFTWARE  OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	This script comes with two constant :
	TQSRT => It's a more precise "typeof".
	toQueryString => The main function. In argument the variable to serialize.
	one day I would do this function "properly" (By only exposing the serialize
	function for example).

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
