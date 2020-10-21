import { spawn, spawnSync, SpawnOptions } from 'child_process';

export type ShellCallback = (code: number | null, signal: NodeJS.Signals | null) => void;
export function shell(command: string): void
export function shell(command: string, cb: ShellCallback): void
export function shell(command: string, options: SpawnOptions): void
export function shell(command: string, options: SpawnOptions, cb: ShellCallback): void
export function shell(command: string, cb_options?: SpawnOptions | ShellCallback, cb?: ShellCallback) {
    const so = {
        shell: true,
        stdio: 'inherit'
    } as SpawnOptions;

    if (!cb_options) {
        return spawnSync(command, so);
    }

    if (!cb) {
        if (typeof cb_options == 'object') {
            Object.assign(so, cb_options)
            return spawnSync(command, so)
        }

        const child = spawn(command, so);
        child.on('exit', cb_options)
        return;
    }

    Object.assign(so, cb_options)
    const child = spawn(command, so);
    child.on('exit', cb)
}

export function shellAsync(command: string, options?: SpawnOptions) {
    return new Promise((resolve, reject) => {
        const so = {
            shell: true,
            stdio: 'inherit'
        } as SpawnOptions;

        if (options) {
            Object.assign(so, options)
        }

        const child = spawn(command, so);
        child.on('exit', (code: number | null, signal: NodeJS.Signals | null) => {
            if (code) return reject(code)
            return resolve()
        })
    })
}