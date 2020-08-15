module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-text-replace')

    grunt.initConfig({
        screeps: {
            options: {
                server:{
                    host: '120.26.76.96',
                    port: '21025',
                    http: true
                },
                email: 'saki',
                password: 'Kaifa@123',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        clean: {
            'dist': ['dist']
        },
        copy: {
            // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // 通过将文件夹分隔符替换成下划线来重命名文件
                        return dest + src.replace(/\//g,'_');
                    }
                }],
            }
        },
        replace:{
            requireReplace:{
                src: ['dist/*.js'],
                overwrite: true,
                replacements:[{
                    from: /require.*/g,
                    to: function (requireString) {
                        requireString = requireString.replace(/\//g,'_')
                        return requireString;
                    }
                }]
            }
        }
    });

    grunt.registerTask('default',  ['clean', 'copy:screeps','replace','screeps']);
}