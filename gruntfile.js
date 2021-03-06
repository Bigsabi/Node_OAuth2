module.exports=function(grunt){

	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],//监听路径
				options:{
					livereload:true//重新启动
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				//tasks:['jshint'],
				options:{
					livereload:true
				}
			}
		},
		jshint:{
			options:{
				jshintrc:'.jshintrc',
				ignores:['public/libs/**/*.js']
			},
			all:['public/js/*.js','test/**/*.js','routes/**/*.js']
		},
		less:{
			development:{
				options:{
					compress:true,
					yuicompress:true,
					optimization:2
				},
				files:{
					'public/build/index.css':'public/less/index.less'
				}
			}
		},
		uglify:{
			development:{
				files:{
					'public/build/admin.min.css':'public/less/admin.js',
					'public/build/detail.min.css':[
						'public/less/admin.js'
					]
				}
			}
		},
		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					//watchedFolders:['app','config'],
					watchedFolders:['./'],
					debug:true,
					delayTime:5,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},
		mochaTest:{
			options:{
				reporter:'spec'
			},
			src:['test/**/*.js']
		},
		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');//检测文件 重启
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.option('force',true);

	grunt.registerTask('default',['concurrent']);
	
	grunt.registerTask('test',['mochaTest']);
}