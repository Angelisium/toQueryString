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
	/**
	 * A function to retrieve more precisely the type of a variable, inspired by :
	 * https://medium.com/better-programming/what-is-object-object-in-javascript-object-prototype-tostring-1db888c695a4
	 * 
	 * @returns {string} The type of variable.
	 * @param {*} a - Any variable
	 */
	function RealTypeOf(a) {
		let _class = Object.prototype.toString.call(a);
			typeOf = _class.replace(/^.*? (.*?)\]$/, '$1');
		return typeOf;
	}
	class Serializer {
		/**
		 * This function is used to initialize the serialize method.
		 * 
		 * @return {serialize} The serialized variable.
		 * @param {*} variable - The variable to serialize.
		 */
		static init(variable) {
			let _serializer = new Serializer();
			return _serializer.serialize(variable, 0);
		}
		/**
		 * The main function, this function serializes the variable according to his type.
		 * 
		 * @param {*} variable 
		 * @param {number} indent 
		 */
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
		/**
		 * @returns {string}
		 * @param {*} variable 
		 * @param {number} indent 
		 */
		mnull(variable, indent) {
			if(indent<1) {
				return "null";
			} return "=null";
		}
		/**
		 * @returns {string}
		 * @param {number} variable 
		 * @param {number} indent 
		 */
		_Number(variable, indent) {
			if(indent<1) {
				return variable.toString();
			} return `=${variable}`;
		}
		/**
		 * @returns {string}
		 * @param {string} variable 
		 * @param {number} indent 
		 */
		_String(variable, indent) {
			if(indent<1) {
				return encodeURI(variable);
			} return `=${encodeURI(variable)}`;
		}
		/**
		 * @returns {string|array}
		 * @param {array} variable 
		 * @param {number} indent 
		 */
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
		/**
		 * @returns {string|array}
		 * @param {object} variable 
		 * @param {number} indent 
		 */
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
