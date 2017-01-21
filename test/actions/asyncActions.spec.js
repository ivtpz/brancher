import chai, { expect } from 'chai';
import { callAsync, endAsync, setDelay } from '../../app/actions/asyncActions'
import { spy } from 'sinon';
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

const actionSpy = spy();
const endAsyncSpy = spy(endAsync);
const newState = {data: []}

describe('Async Actions', function() {

  describe('Call Async', function() {
    it('Should return an object with type ASYNC_ACTIVE', function() {
      expect(callAsync(()=>{}, 0, ()=>{}, {}).type).to.equal('ASYNC_ACTIVE')
    })
    before(function(done) {
      callAsync(actionSpy, 200, () => {}, newState)
      callAsync(actionSpy, 200, () => {}, newState)
      setTimeout(done, 300);
    })
    it('Should execute an action with passed in state after a delay', function() {
      expect(actionSpy).to.have.been.calledWith(newState)
    })
    it('Should space action execution by specified delay', function() {
      expect(actionSpy).to.have.been.calledOnce

      describe('End Async', function() {
        before(function(done) {
          callAsync(() => {}, 200, endAsyncSpy, {})
          callAsync(() => {}, 200, endAsyncSpy, {})
          setTimeout(done, 1000)
        })
        it('Should return an object with type ASYNC_INACTIVE', function() {
          expect(endAsync().type).to.equal('ASYNC_INACTIVE')
        })
        //TODO: write asyncqueue as observable to alert end of queue
        xit('Should execute endAsync action when queue is empty', function() {
          expect(endAsyncSpy).to.have.been.calledOnce
        })
      })
    })
  })

  describe('Set Delay', function() {
    it('Should return an object with type SET_DELAY and the new delay', function() {
      expect(setDelay(200)).to.eql({ type: 'SET_DELAY', newDelay: 200 })
    })
  })

})

