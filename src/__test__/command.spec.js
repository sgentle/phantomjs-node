import Command from "../command";

describe('Command', () => {
    it('id to be randomly generated', () => {
        expect(new Command().id).toEqual(jasmine.any(String));
    });

    it('id to be set correctly', () => {
        expect(new Command('abc').id).toEqual('abc');
    });

    it('JSON.stringify(command) to be valid json', () => {
        expect(JSON.stringify(new Command('1', 'target', 'name'))).toEqual(
            '{"id":"1","target":"target","name":"name","params":[]}'
        );
    });
});
