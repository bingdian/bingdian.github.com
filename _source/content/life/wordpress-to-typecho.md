# 博客从wp换成typecho ^_^

- date: 2011-03-24 21:17
- tags: wordpress,typecho
- category: Life

----------------

用了3年多wordpress了，今天终于换成了typecho。总体使用感觉非常满意，前台后台非常简洁，速度很快，用着除了爽还是爽。

下面简单说一下从wordpress转换typecho方法：

1. 首先安装typecho（转换前请将所有数据备份）
2. 安装插件转换插件wordpress-to-typecho，插件地址：http://docs.typecho.org/plugins/wordpress-to-typecho
3. 启用插件，设置好数据等信息，将wordpress数据库导入typecho
4. 移动附件，将wordpress的wp-content/uploads目录下的附件移动到typecho的usr/uploads目录下，然后在phpmyadmin中执行
update typecho_contents set text=replace(text,'wp-admin/uploads','usr/uploads')

enjoy it!

Nginx下typecho rewrite规则：

	location / {
			index index.html index.php;
			if (-f $request_filename/index.html){
				rewrite (.*) $1/index.html break;
			}
			if (-f $request_filename/index.php){
				rewrite (.*) $1/index.php;
			}
			if (!-f $request_filename){
				rewrite (.*) /index.php;
			}
	}
