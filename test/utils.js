'use strict'

const assert = require('assert');
const utils = require('../utils');

describe('Hearken Utility Methods', () => {

    describe('#msToTime()', () => {
        it('should equal 00:00:05', () => {
            assert.equal(utils.msToTime('5000'), '00:00:05');
        });

        it('should equal 00:00:45', () => {
            assert.equal(utils.msToTime('45000'), '00:00:45');
        });

        it('should equal 00:07:15', () => {
            assert.equal(utils.msToTime('435000'), '00:07:15');
        });

        it('should equal 00:23:05', () => {
            assert.equal(utils.msToTime('1385000'), '00:23:05');
        });

        it('should equal 03:15:23', () => {
            assert.equal(utils.msToTime('11723000'), '03:15:23');
        });

        it('should equal 15:07:25', () => {
            assert.equal(utils.msToTime('54445000'), '15:07:25');
        });
    });

    describe('#timeToMs()', () => {
        it('should equal 5000', () => {
            assert.equal(utils.timeToMs('00:00:05'), '5000');
        });

        it('should equal 45000', () => {
            assert.equal(utils.timeToMs('00:00:45'), '45000');
        });

        it('should equal 435000', () => {
            assert.equal(utils.timeToMs('00:07:15'), '435000');
        });

        it('should equal 1385000', () => {
            assert.equal(utils.timeToMs('00:23:05'), '1385000');
        });

        it('should equal 11723000', () => {
            assert.equal(utils.timeToMs('03:15:23'), '11723000');
        });

        it('should equal 54445000', () => {
            assert.equal(utils.timeToMs('15:07:25'), '54445000');
        });
    });

    describe('#padTime()', () => {
        it('should equal 05', () => {
            assert(utils.padTime(5), '05');
        });

        it('should equal 15', () => {
            assert(utils.padTime(15), '15');
        });
    });

    describe('#buildEvent()', () => {
        it('should return an object with a reason', () => {
            let expected = {
                currentTime: { ms: '12000', time: '00:00:12' },
                elapsedTime: { ms: '3000', time: '00:00:03' },
                reason: 'Just because.'
            };

            assert.deepEqual(utils.buildEvent('15000', '12000', { name: 'reason', value: 'Just because.' } ), expected);
        });

        it('should return an object without a reason', () => {
            let expected = {
                currentTime: { ms: '12000', time: '00:00:12' },
                elapsedTime: { ms: '3000', time: '00:00:03' }
            };

            assert.deepEqual(utils.buildEvent('15000', '12000'), expected);
        });
    });

    describe('#compare()', () => {
        it('should equal the expected output', () => {
            let input = [
                {
                    name: 'one',
                    time: '2000',
                },
                {
                    name: 'two',
                    time: '1000',
                }
            ]

            assert.deepEqual(input.sort(utils.compare), input);
        });
    });

});