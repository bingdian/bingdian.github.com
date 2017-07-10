# SSH Permission denied (publickey)解决办法

- date: 2011-07-29 23:43
- tags:  publickey,ssh,linux
- category: Linux

----------------
重装了mac系统后，用终端terminal录服务器时，提示 Permission denied (publickey)，无法登录，在win下试了一下完全可以登录。

> f you have some problems likes Permission denied (publickey,gssapi-with-mic), or the error 'Not a RSA1 key file' when using ssh remote login, try to fix issues as below:
get more information with ssh -vvv username@yourhost.com, it's more important.
check the permissions of your private and public keys, id_rsa should 600, id_rsa.pub should 644
check if your id_rsa matched with id_rsa.pub.
For the 3rd, it looks very strange, I am not sure it's a bug of openssh or something. The id_rsa.pub is the public key for my windows host (I have ssh server on windows), the id_rsa is the private key for remote linux host, I put them to the .ssh folder.
But when I ssh login the linux host, I got "Permission denied (publickey,gssapi-with-mic)". if I remove id_rsa.pub from .ssh folder, it work fine.

用上面的第三条办法解决，因为我的id_rsa和id_ras.pub位于同一目录，将id_rsa.pub删除后成功登陆服务器。
