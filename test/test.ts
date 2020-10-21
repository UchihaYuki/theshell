import { assert } from 'chai';
import { shell, shellAsync } from '../src/index';

// describe("shell", function () {

//     it("function shell(command: string): void", function () {
//         shell('docker image list | grep juju')
//     });

//     it("shell(command: string, cb: ShellCallback): void", function (done) {
//         shell('docker image list | grep juju', done)
//     });

//     it("function shell(command: string, options: SpawnOptions): void", function () {
//         const r = shell('env | grep LANGS', {
//             env: {
//                 LANGS: "en zh"
//             }
//         })
//     });

//     it("function shell(command: string, options: SpawnOptions, cb: ShellCallback): void", function (done) {
//         const r = shell('env | grep LANGS', {
//             env: {
//                 LANGS: "en zh"
//             }
//         }, done)
//     });
// });

describe("Async", function () {

    // it("function shellAsync(command: string, options?: SpawnOptions)", () => shellAsync('bash -c "ls"'));

    // it("function shellAsync(command: string, options?: SpawnOptions)", () => shellAsync('bash -c "ls"', {
    //     cwd: "src"
    // }));

    it("chain function shellAsync(command: string, options?: SpawnOptions)", () =>
        shellAsync(`ls`)
            .then(() => shellAsync(`ls src`))
            .then(() => shellAsync('ls test')));
});