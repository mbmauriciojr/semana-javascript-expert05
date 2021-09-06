import {
  describe,
  test,
  expect,
  jest
} from '@jest/globals';
import fs from 'fs';
import Routes from './../../src/routes.js';
import FileHelper from './../../src/fileHelper.js';

describe('#FileHelper', () =>{
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 2050,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 13645441,
        size: 215129,
        blocks: 424,
        atimeMs: 1630959665704.6704,
        mtimeMs: 1630959665642,
        ctimeMs: 1630959665636.671,
        birthtimeMs: 1630959656520.7097,
        atime: '2021-09-06T20:21:05.705Z',
        mtime: '2021-09-06T20:21:05.642Z',
        ctime: '2021-09-06T20:21:05.637Z',
        birthtime: '2021-09-06T20:20:56.521Z',
      };

      const mockUser = 'tchelo';
      process.env.USER = mockUser;
      const filename = 'bear.jpg';

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus('/tmp');

      const expectedResult = [
        {
          size: "215 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});