import {describe, expect, test} from 'vitest';
import {Literal} from "../src/triple";
import {Language} from "../src/language";

describe('Literals', () => {

    describe('toString', () => {

        test('language absent and datatype absent', () => {
           expect(Literal.createIfDefined('abc', undefined, undefined)?.toString())
               .toEqual('"""abc"""');
        });

        test('escapes "', () => {
            expect(Literal.createIfDefined('abc"def', undefined, undefined)?.toString())
                .toEqual('"""abc\\"def"""');
        });

        test('supports multiline strings "', () => {
            expect(Literal.createIfDefined('abc\ndef', undefined, undefined)?.toString())
                .toEqual('"""abc\ndef"""');
        });

        test('language present', () => {
           expect(Literal.createIfDefined('abc"def', Language.NL, undefined)?.toString())
               .toEqual('"""abc\\"def"""@nl');
        });

        test('datatype present', () => {
            expect(Literal.createIfDefined('abc"def', undefined, "http://www.w3.org/2001/XMLSchema#dateTime")?.toString())
                .toEqual('"""abc\\"def"""^^<http://www.w3.org/2001/XMLSchema#dateTime>');
        });
    });
});
