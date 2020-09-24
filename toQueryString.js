// Copyright (C) 2019 by Angelisium

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of  this  software and associated  documentation files  (the "Software"), to
// deal in the  Software without restriction,  including without limitation the
// rights to use, copy, modify, merge,  publish, distribute, sublicense, and/or
// sell copies of the Software,  and to  permit persons to whom the Software is
// furnished to do so, subject to the following conditions: The above copyright
// notice  and  this  permission  notice shall  be  included  in  all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY  OF ANY KIND, EXPRESS OR
// IMPLIED,  INCLUDING  BUT  NOT  LIMITED TO THE WARRANTIES  OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE  AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS  OR  COPYRIGHT  HOLDERS BE LIABLE  FOR  ANY CLAIM,  DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN  CONNECTION WITH  THE SOFTWARE  OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// This script exposes one constant :
// toQueryString => The main function. In argument the variable to serialize.

const toQueryString = (function() {
	function RealTypeOf(a) {
		let _class = Object.prototype.toString.call(a);
			typeOf = _class.replace(/^.*? (.*?)\]$/, '$1');
		return typeOf;
	}
	class Serializer {
		static init(variable) {
			let _serializer = new Serializer();
			return _serializer.serialize(variable, 0);
		}
		serialize(variable, indent) {
			let type = RealTypeOf(variable);
			if(!this[`_${type}`]) {
				if(['Null', '', ''].indexOf(type)<0) {
					console.error(`Uncaught TypeError: ${type} is unknown`);
				} return this.mnull(variable, indent);
			} else {
				return this[`_${type}`](variable, indent);
			}
		}
		mnull(variable, indent) {
			if(indent<1) {
				return "null";
			} return "=null";
		}
		_Number(variable, indent) {
			if(indent<1) {
				return variable.toString();
			} return `=${variable}`;
		}
		_String(variable, indent) {
			if(indent<1) {
				return encodeURI(variable);
			} return `=${encodeURI(variable)}`;
		}
		_Array(variable, indent) {
			let result= [];
			for(let item of variable) {
				let serializedItem = this.serialize(item, indent+1),
					typeItem = RealTypeOf(serializedItem);
				if(typeItem === "Array") {
					for(let subItem of serializedItem) {
						result.push(`[]${subItem}`);
					}
				} else {
					result.push(`[]${serializedItem}`);
				}
			}
			if(indent<1) {
				return result.join('&');
			} return result;
		}
		_Object(variable, indent) {
			let result = [],
				keys = Object.keys(variable);
			for(let key of keys) {
				let serializedItem = this.serialize(variable[key], indent+1),
					typeItem = RealTypeOf(serializedItem);
				if(typeItem === "Array") {
					for(let subItem of serializedItem) {
						result.push(`${(indent<1)?key:`[${key}]`}${subItem}`);
					}
				} else {
					result.push(`${(indent<1)?key:`[${key}]`}${serializedItem}`);
				}
			}
			if(indent<1) {
				return result.join('&');
			} return result;
		}
	}
	return Serializer.init;
})();
