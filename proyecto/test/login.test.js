import { expect } from "chai";
import { login } from "../src/controllers/authController.js";
import sinon from "sinon";

describe('Login Function', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        consoleSpy.restore();
    });

    it('should log "No se ha proporcionado un password" if password is empty', () => {
        login('coderUser', '');
        expect(consoleSpy.calledWith('No se ha proporcionado un password')).to.be.true;
    });

    it('should log "No se ha proporcionado un usuario" if user is empty', () => {
        login('', '123');
        expect(consoleSpy.calledWith('No se ha proporcionado un usuario')).to.be.true;
    });

    it('should log "Contraseña incorrecta" if password is incorrect', () => {
        login('coderUser', 'wrongPassword');
        expect(consoleSpy.calledWith('Contraseña incorrecta')).to.be.true;
    });

    it('should log "Credenciales incorrectas" if user is incorrect', () => {
        login('wrongUser', '123');
        expect(consoleSpy.calledWith('Credenciales incorrectas')).to.be.true;
    });

    it('should log "logueado" if user and password are correct', () => {
        login('coderUser', '123');
        expect(consoleSpy.calledWith('logueado')).to.be.true;
    });
});