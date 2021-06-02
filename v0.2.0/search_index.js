var documenterSearchIndex = {"docs":
[{"location":"rotate/#Rotation-with-FFT","page":"Image Rotation with FFTs","title":"Rotation with FFT","text":"","category":"section"},{"location":"rotate/","page":"Image Rotation with FFTs","title":"Image Rotation with FFTs","text":"Via shear it is possible to rotate an image. Since we also implemented a shear algorithm, rotation can be implemented as well. For details look at this webpage.","category":"page"},{"location":"rotate/#Examples","page":"Image Rotation with FFTs","title":"Examples","text":"","category":"section"},{"location":"rotate/","page":"Image Rotation with FFTs","title":"Image Rotation with FFTs","text":"For full interactivity, have a look at this Pluto notebook.","category":"page"},{"location":"rotate/","page":"Image Rotation with FFTs","title":"Image Rotation with FFTs","text":"using Revise, FourierTools, Plots, TestImages, PlutoUI, ImageShow\n\nbegin\n    img = Float32.(testimage(\"fabio_512_gray\"))\n    z = zeros(Float32, (768, 768))\n    FourierTools.center_set!(z, img)\nend\n\n\nGray.(FourierTools.rotate(z, 26))","category":"page"},{"location":"rotate/","page":"Image Rotation with FFTs","title":"Image Rotation with FFTs","text":"(Image: )","category":"page"},{"location":"rotate/#Function-references","page":"Image Rotation with FFTs","title":"Function references","text":"","category":"section"},{"location":"rotate/","page":"Image Rotation with FFTs","title":"Image Rotation with FFTs","text":"    FourierTools.rotate\n    FourierTools.rotate!","category":"page"},{"location":"rotate/#FourierTools.rotate","page":"Image Rotation with FFTs","title":"FourierTools.rotate","text":"rotate(arr, θ, rotation_plane=(1,2))\n\nRotate an arr in the plane rotation_plane with an angle θ in degree around the center pixel.\n\nrotate! is also available.\n\n\n\n\n\n","category":"function"},{"location":"rotate/#FourierTools.rotate!","page":"Image Rotation with FFTs","title":"FourierTools.rotate!","text":"rotate!(arr, θ, rotation_plane=(1,2))\n\nRotate an arr in the plane rotation_plane with an angle θ in degree around the center pixel.\n\n\n\n\n\n","category":"function"},{"location":"convolutions/#Function-References","page":"FFT Based Convolutions","title":"Function References","text":"","category":"section"},{"location":"convolutions/","page":"FFT Based Convolutions","title":"FFT Based Convolutions","text":"conv\nplan_conv","category":"page"},{"location":"convolutions/#FourierTools.conv","page":"FFT Based Convolutions","title":"FourierTools.conv","text":"conv(u, v[, dims])\n\nConvolve `u` with `v` over `dims` dimensions with an FFT based method.\nNote, that this method introduces wrap-around artifacts without\nproper padding/windowing.\n\nArguments\n\nu is an array in real space.\nv is the array to be convolved in real space as well.\nPer default ntuple(+, min(N, M))) means that we perform the convolution    over all dimensions of that array which has less dimensions.    If dims is an array with integers, we perform convolution    only over these dimensions. Eg. dims=[1,3] would perform the convolution   over the first and third dimension. Second dimension is not convolved.\n\nIf u and v are both a real valued array we use rfft and hence the output is real as well. If either u or v is complex we use fft and output is hence complex.\n\nExamples\n\n1D with FFT over all dimensions. We choose v to be a delta peak. Therefore convolution should act as identity.\n\njulia> u = [1 2 3 4 5]\n1×5 Array{Int64,2}:\n 1  2  3  4  5\njulia> v = [0 0 1 0 0]\n1×5 Array{Int64,2}:\n 0  0  1  0  0\n\njulia> conv(u, v)\n1×5 Matrix{Float64}:\n 4.0  5.0  1.0  2.0  3.0\n\n2D with FFT with different dims arguments.\n\njulia> u = 1im .* [1 2 3; 4 5 6]\n2×3 Matrix{Complex{Int64}}:\n 0+1im  0+2im  0+3im\n 0+4im  0+5im  0+6im\n\njulia> v = [1im 0 0; 1im 0 0]\n2×3 Matrix{Complex{Int64}}:\n 0+1im  0+0im  0+0im\n 0+1im  0+0im  0+0im\n\njulia> conv(u, v)\n2×3 Matrix{ComplexF64}:\n -5.0+0.0im  -7.0+0.0im  -9.0+0.0im\n -5.0+0.0im  -7.0+0.0im  -9.0+0.0im\n\n\n\n\n\n","category":"function"},{"location":"convolutions/#FourierTools.plan_conv","page":"FFT Based Convolutions","title":"FourierTools.plan_conv","text":"plan_conv(u, v [, dims])\n\nPre-plan an optimized convolution for arrays shaped like u and v (based on pre-plan FFT) along the given dimenions dims. dims = 1:ndims(u) per default. The 0 frequency of u must be located at the first entry.\n\nWe return two arguments:  The first one is v_ft (obtained by fft(v) or rfft(v)). The second return is the convolution function pconv. pconv itself has two arguments. pconv(u, v_ft=v_ft) where u is the object and v_ft the v_ft. This function achieves faster convolution than conv(u, u). Depending whether u is real or complex we do ffts or rffts\n\nExamples\n\njulia> u = [1 2 3 4 5]\n1×5 Matrix{Int64}:\n 1  2  3  4  5\n\njulia> v = [1 0 0 0 0]\n1×5 Matrix{Int64}:\n 1  0  0  0  0\n\njulia> v_ft, pconv = plan_conv(u, v);\n\njulia> pconv(u, v_ft)\n1×5 Matrix{Float64}:\n 1.0  2.0  3.0  4.0  5.0\n\njulia> pconv(u)\n1×5 Matrix{Float64}:\n 1.0  2.0  3.0  4.0  5.0\n\n\n\n\n\n","category":"function"},{"location":"shear/#Rotation-with-FFT","page":"Image Shearing with FFTs","title":"Rotation with FFT","text":"","category":"section"},{"location":"shear/","page":"Image Shearing with FFTs","title":"Image Shearing with FFTs","text":"Via shear it is possible to rotate an image. Shearing is basically a shift operation but with different shift distance in each row.","category":"page"},{"location":"shear/#Examples","page":"Image Shearing with FFTs","title":"Examples","text":"","category":"section"},{"location":"shear/","page":"Image Shearing with FFTs","title":"Image Shearing with FFTs","text":"For full interactivity, have a look at this Pluto notebook.","category":"page"},{"location":"shear/","page":"Image Shearing with FFTs","title":"Image Shearing with FFTs","text":"using Revise, FourierTools, Plots, TestImages, PlutoUI, ImageShow\n\nbegin\n    img = Float32.(testimage(\"fabio_512_gray\"))\n    z = zeros(Float32, (768, 768))\n    FourierTools.center_set!(z, img)\nend\n\nGray.(FourierTools.shear(z, -305))","category":"page"},{"location":"shear/","page":"Image Shearing with FFTs","title":"Image Shearing with FFTs","text":"(Image: )","category":"page"},{"location":"shear/#Function-references","page":"Image Shearing with FFTs","title":"Function references","text":"","category":"section"},{"location":"shear/","page":"Image Shearing with FFTs","title":"Image Shearing with FFTs","text":"    FourierTools.shear\n    FourierTools.shear!","category":"page"},{"location":"shear/#FourierTools.shear","page":"Image Shearing with FFTs","title":"FourierTools.shear","text":"shear(arr, Δ, shear_dir_dim=1, shear_dim=2)\n\nShears an array by the amount of Δ pixels via an FFT approach. Δ is the relative shift between the top and bottom row shifted with respect to each other. shear_dir_dim decides the direction of the shear and shear_dim is the  second dimension where the shear happens. There is also shear! available.\n\nFor complex arrays we use fft, for real array we use rfft.\n\n\n\n\n\n","category":"function"},{"location":"shear/#FourierTools.shear!","page":"Image Shearing with FFTs","title":"FourierTools.shear!","text":"shear!(arr, Δ, shear_dir_dim=1, shear_dim=2)\n\nFor more details see shear.\n\nFor complex arrays we can completely avoid large memory allocations. For real arrays, we need at least allocate on array in the fourier space.\n\n\n\n\n\n","category":"function"},{"location":"resampling/#Resampling","page":"Resampling (sinc Interpolation)","title":"Resampling","text":"","category":"section"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"To sinc interpolate a signal, it is possible to zero pad a signal in Fourier space and to do an inverse Fourier transform effectively evaluating the Fourier series at more samples. If the signal was initially band-limited, sinc interpolation leads to smoother, perfectly interpolated signals","category":"page"},{"location":"resampling/#Sinc-interpolation","page":"Resampling (sinc Interpolation)","title":"Sinc interpolation","text":"","category":"section"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"Below you can find a simple example for up sampling using resample.  Furthermore, there is an image interpolation Pluto.jl notebook in the examples folder. We can see that the interpolated signal matches the higher sampled signal well.","category":"page"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":" begin\n\tN_low = 128\n\tx_min = 0.0\n\tx_max = 16π\n\t\n\txs_low = range(x_min, x_max, length=N_low+1)[1:N_low]\n\txs_high = range(x_min, x_max, length=5000)[1:end-1]\n\tf(x) = sin(0.5*x) + cos(x) + cos(2 * x) + sin(0.25*x)\n\tarr_low = f.(xs_low)\n\tarr_high = f.(xs_high)\nend\n\nbegin\n\tN = 1000\n\txs_interp = range(x_min, x_max, length=N+1)[1:N]\n\tarr_interp = resample(arr_low, N)\nend\n\nbegin\n\tscatter(xs_low, arr_low, legend=:bottomleft, markersize=2, label=\"Low sampling\")\n\tplot!(xs_interp, arr_interp, label=\"FFT based sinc interpolation\", linestyle=:dash)\n\tplot!(xs_high, arr_high, linestyle=:dashdotdot, label=\"High sampling\")\nend","category":"page"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"(Image: )","category":"page"},{"location":"resampling/#Downsampling","page":"Resampling (sinc Interpolation)","title":"Downsampling","text":"","category":"section"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"32 samples in the downsampled signal should be sufficient for Nyquist sampling. And as we can see, the downsampled signal still matches the original one.","category":"page"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"begin\n\tN_ds = 32\n\txs_ds = range(x_min, x_max, length=N_ds+1)[1:N_ds]\n\tarr_ds = resample(arr_high, N_ds)\nend\n\nbegin\n\tscatter(xs_low, arr_low, legend=:bottomleft, markersize=2, label=\"Low sampling\")\n\tplot!(xs_interp, arr_interp, label=\"FFT based sinc interpolation\", linestyle=:dash)\n\tplot!(xs_ds, arr_ds, label=\"resampled array\", linestyle=:dot)\t\nend","category":"page"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"(Image: )","category":"page"},{"location":"resampling/#Image-Upsampling","page":"Resampling (sinc Interpolation)","title":"Image Upsampling","text":"","category":"section"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"Having a Nyquist sampled image, it is possible to perform a sinc interpolation and creating visually much nicer images. However, the information content does not change between both images. The full Pluto notebook is here. The right image is the upsampled version of the left one.","category":"page"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"(Image: ) (Image: )","category":"page"},{"location":"resampling/#Function-References","page":"Resampling (sinc Interpolation)","title":"Function References","text":"","category":"section"},{"location":"resampling/","page":"Resampling (sinc Interpolation)","title":"Resampling (sinc Interpolation)","text":"FourierTools.resample","category":"page"},{"location":"resampling/#FourierTools.resample","page":"Resampling (sinc Interpolation)","title":"FourierTools.resample","text":"resample(arr, new_size [, normalize])\n\nCalculates the sinc interpolation of an arr on a new array size new_size. It is a re-evaluation of the Fourier series at new grid points. new_size can be arbitrary. Each dimension is then independently either up or downsampled.\n\nThis method is based on FFTs and therefore implicitly assumes periodic boundaries and a finite frequency support.\n\nnormalize=true by default multiplies by an appropriate factor so that the array size is included in the scaling. This results in an array having roughly the same mean intensity.\n\nBasic Principle\n\nIf size(new_size)[i] > size(arr)[i], we apply zero padding in Fourier space.\n\nIf size(new_size)[i] < size(arr)[i], we cut out a centered part of the Fourier spectrum.\n\nWe apply some tricks at the boundary to increase accuracy of highest frequencies. \n\nFor real arrays we use rfft based operations, for complex one we use fft based ones.\n\nExamples\n\nsinc interpolation of 2 datapoints result in an approximation of cosine.\n\njulia> resample([2.0, 0.0], (6,))\n6-element Vector{Float64}:\n 2.0\n 1.5\n 0.5\n 0.0\n 0.5\n 1.5\n\njulia> resample([2.0, 0.0], (6,)) ≈ 1 .+ cos.(2π .* (0:5)./6)\ntrue\n\n\n\n\n\n","category":"function"},{"location":"shifting/#Shifting","page":"Shifting with FFTs","title":"Shifting","text":"","category":"section"},{"location":"shifting/","page":"Shifting with FFTs","title":"Shifting with FFTs","text":"Using the Fourier shift property one can implement shifting of arrays not only over pixel but also sub-pixel amount.","category":"page"},{"location":"shifting/#Examples","page":"Shifting with FFTs","title":"Examples","text":"","category":"section"},{"location":"shifting/","page":"Shifting with FFTs","title":"Shifting with FFTs","text":"For full interactivity, have a look at this Pluto notebook.","category":"page"},{"location":"shifting/","page":"Shifting with FFTs","title":"Shifting with FFTs","text":"begin\n    f(x) = cos(4π * x / 30)\n    x1 = 1:30\n    x2 = x1 .+ 3\nend\n\nbegin\n    y1 = f.(x1)\n    y2 = f.(x2)\n    offset = 2.01\n    y3 = shift(y2, tuple(offset))\nend\n\nbegin\n    plot(y1, label=\"Original signal\")\n    plot!(y2, label=\"Shifted signal\")\n    plot!(y3, label=\"Fourier shifted with $offset\")\nend","category":"page"},{"location":"shifting/","page":"Shifting with FFTs","title":"Shifting with FFTs","text":"(Image: )","category":"page"},{"location":"shifting/#Function-references","page":"Shifting with FFTs","title":"Function references","text":"","category":"section"},{"location":"shifting/","page":"Shifting with FFTs","title":"Shifting with FFTs","text":"    FourierTools.shift\n    FourierTools.shift!","category":"page"},{"location":"shifting/#FourierTools.shift","page":"Shifting with FFTs","title":"FourierTools.shift","text":"shift(arr, shifts)\n\nReturning a shifted array. See shift! for more details\n\n\n\n\n\n","category":"function"},{"location":"shifting/#FourierTools.shift!","page":"Shifting with FFTs","title":"FourierTools.shift!","text":"shift!(arr, shifts)\n\nShifts an array in-place. For real arrays it is based on rfft. For complex arrays based on fft. shifts can be non-integer, for integer shifts one should prefer circshift or ShiftedArrays.circshift because a FFT-based methods introduces numerical errors.\n\nMemory Usage\n\nNote that for complex arrays we can avoid any large memory allocations because of fft!. For rfft there does not exist a usable implementation yet, so for real arrays there might be a temporary larger memory usage.\n\nExamples\n\njulia> x = [1.0 2.0 3.0; 4.0 5.0 6.0]\n2×3 Matrix{Float64}:\n 1.0  2.0  3.0\n 4.0  5.0  6.0\n\njulia> shift!(x, (1, 2))\n2×3 Matrix{Float64}:\n 5.0  6.0  4.0\n 2.0  3.0  1.0\n\njulia> x = [0, 1.0, 0.0, 1.0]\n4-element Vector{Float64}:\n 0.0\n 1.0\n 0.0\n 1.0\n\njulia> shift!(x, 0.5)\n4-element Vector{Float64}:\n 0.49999999999999994\n 0.5\n 0.49999999999999994\n 0.5\n\n\n\n\n\n","category":"function"},{"location":"#FourierTools.jl","page":"FourierTools.jl","title":"FourierTools.jl","text":"","category":"section"},{"location":"","page":"FourierTools.jl","title":"FourierTools.jl","text":"Install FourierTools.jl via the package manager. Currently with","category":"page"},{"location":"","page":"FourierTools.jl","title":"FourierTools.jl","text":"julia> add https://github.com/bionanoimaging/FourierTools.jl","category":"page"},{"location":"","page":"FourierTools.jl","title":"FourierTools.jl","text":"Check out the sub pages for different applications.","category":"page"},{"location":"helpers/#FFT-helpers","page":"FFT Helpers","title":"FFT helpers","text":"","category":"section"},{"location":"helpers/","page":"FFT Helpers","title":"FFT Helpers","text":"ffts\nffts!\niffts\nrffts\nirffts\nFourierTools.fftshift_view\nFourierTools.ifftshift_view\nFourierTools.rfftshift_view\nFourierTools.irfftshift_view\nft\nift\nrft\nirft","category":"page"},{"location":"helpers/#FourierTools.ffts","page":"FFT Helpers","title":"FourierTools.ffts","text":"ffts(A [, dims])\n\nResult is semantically equivalent to fftshift(fft(A, dims), dims) However, the shift is done with ShiftedArrays and therefore doesn't allocate memory.\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.ffts!","page":"FFT Helpers","title":"FourierTools.ffts!","text":"ffts!(A [, dims])\n\nResult is semantically equivalent to fftshift(fft!(A, dims), dims). A is in-place modified. However, the shift is done with ShiftedArrays and therefore doesn't allocate memory.\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.iffts","page":"FFT Helpers","title":"FourierTools.iffts","text":"iffts(A [, dims])\n\nResult is semantically equivalent to ifft(ifftshift(A, dims), dims). A is in-place modified. However, the shift is done with ShiftedArrays and therefore doesn't allocate memory.\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.rffts","page":"FFT Helpers","title":"FourierTools.rffts","text":"rffts(A [, dims])\n\nCalculates a rfft(A, dims) and then shift the frequencies to the center. dims[1] is not shifted, because there is no negative and positive frequency. The shift is done with ShiftedArrays and therefore doesn't allocate memory.\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.irffts","page":"FFT Helpers","title":"FourierTools.irffts","text":"irffts(A, d, [, dims])\n\nCalculates a irfft(A, d, dims) and then shift the frequencies back to the corner. dims[1] is not shifted, because there is no negative and positive frequency. The shift is done with ShiftedArrays and therefore doesn't allocate memory.\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.fftshift_view","page":"FFT Helpers","title":"FourierTools.fftshift_view","text":"fftshift_view(A [, dims])\n\nResult is semantically equivalent to fftshift(A, dims) but returns  a view instead. \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.ifftshift_view","page":"FFT Helpers","title":"FourierTools.ifftshift_view","text":"ifftshift_view(A [, dims])\n\nResult is semantically equivalent to fftshift(A, dims) but returns  a view instead. \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.rfftshift_view","page":"FFT Helpers","title":"FourierTools.rfftshift_view","text":"rfftshift_view(A, dims)\n\nShifts the frequencies to the center expect for dims[1] because there os no negative and positive frequency.\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.irfftshift_view","page":"FFT Helpers","title":"FourierTools.irfftshift_view","text":"irfftshift_view(A, dims)\n\nShifts the frequencies back to the corner except for dims[1] because there os no negative and positive frequency.\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.ft","page":"FFT Helpers","title":"FourierTools.ft","text":"ft(A [, dims])\n\nDigital Fourier-transformation centered in both spaces. The result is semantically equivalent to fftshift(fft(ifftshift(A, dims), dims), dims) This is a digital Fourier transformation with both coordinate systems in real and Fourier-space being centered at position CtrFT == size÷2+1\n\nThe following identities are true:\n\njulia> sz = (5,5)\n(5, 5)\n\njulia> ft(ones(sz)) ≈ prod(sz) .* δ(sz)\ntrue\n\njulia> ft(δ(sz)) ≈ ones(sz)\ntrue\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.ift","page":"FFT Helpers","title":"FourierTools.ift","text":"ift(A [, dims])\n\nDigital inverse Fourier-transformation centered in both spaces. The result is semantically equivalent to fftshift(ifft(ifftshift(A, dims), dims), dims) This is a digital Fourier transformation with both coordinate systems in real and Fourier-space being centered at position CtrFT == size÷2+1\n\nThe following identities are true:\n\njulia> sz = (5,6,7)\n(5, 6, 7)\n\njulia> ift(ones(sz)) ≈ δ(sz)\ntrue\n\njulia> ift(δ(sz)) ≈ ones(sz) ./ prod(sz)\ntrue\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.rft","page":"FFT Helpers","title":"FourierTools.rft","text":"rft(A [, dims])\n\nDigital real-valued Fourier-transformation centered in both spaces. The result is semantically equivalent to fftshift(rfft(ifftshift(A, dims), dims), dims) This is a digital Fourier transformation with the coordinate systems in real space centered at CtrFT == size÷2+1 and in (half) Fourier-space being centered at CtrRFT == setindex(size÷2 +1,1,1).\n\nThe following identities are true:\n\njulia> sz = (6,6)\n(6, 6)\n\njulia> rft(δ(sz)) ≈ ones(rft_size(sz))\ntrue\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.irft","page":"FFT Helpers","title":"FourierTools.irft","text":"irft(A, d, [, dims])\n\nDigital real-valued inverse Fourier-transformation centered in both spaces. The result is semantically equivalent to fftshift(irfft(ifftshift(A, dims), dims), dims) This is a digital Fourier transformation with the coordinate systems in real space centered at CtrFT == size÷2+1 and in (half) Fourier-space being centered at CtrRFT == setindex(size÷2 +1,1,1). Note that the size d of the first transform direction [1] is a required argument.\n\nThe following identities are true:\n\njulia> sz = (6,6)\n(6, 6)\n\njulia> irft(ones(rft_size(sz)),sz[1]) ≈ δ(sz)\ntrue\n\nSee also: ft, ift, rft, irft,           ffts,  iffts,  ffts!, rffts, irffts, \n\n\n\n\n\n","category":"function"},{"location":"helpers/#FFT-Utils","page":"FFT Helpers","title":"FFT Utils","text":"","category":"section"},{"location":"helpers/","page":"FFT Helpers","title":"FFT Helpers","text":"FourierTools.fftpos\nFourierTools.fft_center\nFourierTools.rft_size\nFourierTools.rfft_size\nFourierTools.ft_center_diff\nFourierTools.rft_center_diff\nFourierTools.center_pos","category":"page"},{"location":"helpers/#FourierTools.fftpos","page":"FFT Helpers","title":"FourierTools.fftpos","text":"fftpos(L, N)\n\nConstruct a range from -L/2 to L/2. However, we ensure that everything is centered around the center in a way that a FFT interpretes it correctly. For odd sequences it is indeed in the real center. For even sequences the center is at N/2 + 1.\n\nExamples\n\njulia> collect(fftpos(1, 4))\n4-element Array{Float64,1}:\n -0.5\n -0.25\n  0.0\n  0.25\njulia> collect(fftpos(1, 5))\n5-element Array{Float64,1}:\n -0.5\n -0.25\n  0.0\n  0.25\n  0.5\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.fft_center","page":"FFT Helpers","title":"FourierTools.fft_center","text":"fft_center(x)\n\nReturns the center of a size in Fourier sense and Julia  1-based indices.\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.rft_size","page":"FFT Helpers","title":"FourierTools.rft_size","text":"rft_size(sz::NTuple{Int})\n\nReturns the size of an rft or rfft performed on the data x, without performing the rfft. sz: corresponding real space size to obtain the rft size for\n\n\n\n\n\nrft_size(arr)\n\nReturns the size of an rft or rfft performed on the data x, without performing the rfft.\n\narr: array to optain the corresponding rft size for\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.rfft_size","page":"FFT Helpers","title":"FourierTools.rfft_size","text":"rfft_size(size, dims)\n\nReturns the size rfft would return if applied to a real array. size is the input size to rfft  and dims the dimensions the rfft transforms over. Actually we only would need first(dims).\n\njulia> using FFTW\n\njulia> rfft((ones((4,3,2))), (2,3)) |> size\n(4, 2, 2)\n\njulia> FourierTools.rfft_size((4,3,2), (2, 3))\n(4, 2, 2)\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.ft_center_diff","page":"FFT Helpers","title":"FourierTools.ft_center_diff","text":"ft_center_diff(s [, dims])\n\nCalculates how much each dimension must be shifted that the center frequency is at the Fourier center. This if for a normal fft\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.rft_center_diff","page":"FFT Helpers","title":"FourierTools.rft_center_diff","text":"rft_center_diff(s [, dims])\n\nCalculates how much each dimension must be shifted that the center frequency is at the Fourier center. This is for rfft. The dims[1] must be therefore not shifted!\n\n\n\n\n\n","category":"function"},{"location":"helpers/#FourierTools.center_pos","page":"FFT Helpers","title":"FourierTools.center_pos","text":"center_pos(x)\n\nCalculate the position of the center frequency. Size of the array is x\n\nExamples\n\njulia> FourierTools.center_pos(3)\n2\njulia> FourierTools.center_pos(4)\n3\n\n\n\n\n\n","category":"function"},{"location":"utils/#Some-Utility-Functions","page":"Utility Functions","title":"Some Utility Functions","text":"","category":"section"},{"location":"utils/","page":"Utility Functions","title":"Utility Functions","text":"FourierTools.δ\nFourierTools.center_set!\nFourierTools.get_indices_around_center\nFourierTools.center_extract\nFourierTools.selectsizes\nFourierTools.expanddims\nFourierTools.slice\nFourierTools.slice_indices","category":"page"},{"location":"utils/#FourierTools.δ","page":"Utility Functions","title":"FourierTools.δ","text":"δ([T,] sz, pos=FourierTools.fft_center.(sz))\n\nReturn an array which has 1 at pos in the  array of size sz.\n\nExamples\n\njulia> δ((3, 3))\n3×3 Matrix{Int64}:\n 0  0  0\n 0  1  0\n 0  0  0\n\njulia> δ(Float32, (4, 3))\n4×3 Matrix{Float32}:\n 0.0  0.0  0.0\n 0.0  0.0  0.0\n 0.0  1.0  0.0\n 0.0  0.0  0.0\n\njulia> δ(Float32, (3, 3), (1,1))\n3×3 Matrix{Float32}:\n 1.0  0.0  0.0\n 0.0  0.0  0.0\n 0.0  0.0  0.0\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.center_set!","page":"Utility Functions","title":"FourierTools.center_set!","text":"center_set!(arr_large, arr_small)\n\nPuts the arr_small central into arr_large. The convention, where the center is, is the same as the definition as for FFT based centered. Function works both for even and uneven arrays.\n\nExamples\n\njulia> FourierTools.center_set!([1, 1, 1, 1, 1, 1], [5, 5, 5])\n6-element Array{Int64,1}:\n 1\n 1\n 5\n 5\n 5\n 1\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.get_indices_around_center","page":"Utility Functions","title":"FourierTools.get_indices_around_center","text":"get_indices_around_center(i_in, i_out)\n\nA function which provides two output indices i1 and i2 where i2 - i1 = i_out The indices are chosen in a way that the set i1:i2 cuts the interval 1:i_in in a way that the center frequency stays at the center position. Works for both odd and even indices\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.center_extract","page":"Utility Functions","title":"FourierTools.center_extract","text":"center_extract(arr, new_size_array)\n\nExtracts a center of an array.  new_size_array must be list of sizes indicating the output size of each dimension. Centered means that a center frequency stays at the center position. Works for even and uneven. If length(new_size_array) < length(ndims(arr)) the remaining dimensions are untouched and copied.\n\nExamples\n\njulia> FourierTools.center_extract([1 2; 3 4], [1])\n1×2 view(::Matrix{Int64}, 2:2, 1:2) with eltype Int64:\n 3  4\n\njulia> FourierTools.center_extract([1 2; 3 4], [1, 1])\n1×1 view(::Matrix{Int64}, 2:2, 2:2) with eltype Int64:\n 4\n\njulia> FourierTools.center_extract([1 2 3; 3 4 5; 6 7 8], [2 2])\n2×2 view(::Matrix{Int64}, 1:2, 1:2) with eltype Int64:\n 1  2\n 3  4\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.selectsizes","page":"Utility Functions","title":"FourierTools.selectsizes","text":"selectsizes(x, dism; keep_dims=true)\n\nSelect the sizes of x for all dims If keep_dims=true the non-selected dimensions are returned as 1.\n\nExamples\n\njulia> FourierTools.selectsizes(randn((4,3,2)), (2,3))\n(1, 3, 2)\n\njulia> FourierTools.selectsizes(randn((4,3,2)), (2,3), keep_dims=false)\n(3, 2)\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.expanddims","page":"Utility Functions","title":"FourierTools.expanddims","text":"expanddims(x, ::Val{N})\nexpanddims(x, N::Number)\n\nexpands the dimensions of an array to a given number of dimensions.\n\nTry to prefer the Val version because this is type-stable. Val(N) encapsulates the number in a type from which the compiler can then infer the return type.\n\nExamples\n\nThe result is a 5D array with singleton dimensions at the end\n\njulia> expanddims(ones((1,2,3)), Val(5))\n1×2×3×1×1 Array{Float64, 5}:\n[:, :, 1, 1, 1] =\n 1.0  1.0\n\n[:, :, 2, 1, 1] =\n 1.0  1.0\n\n[:, :, 3, 1, 1] =\n 1.0  1.0\n\njulia> expanddims(ones((1,2,3)), 5)\n1×2×3×1×1 Array{Float64, 5}:\n[:, :, 1, 1, 1] =\n 1.0  1.0\n\n[:, :, 2, 1, 1] =\n 1.0  1.0\n\n[:, :, 3, 1, 1] =\n 1.0  1.0\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.slice","page":"Utility Functions","title":"FourierTools.slice","text":"slice(arr, dim, index)\n\nReturn a N dimensional slice (where one dimensions has size 1) of the N-dimensional arr at the index position index in the dim dimension of the array. It holds size(out)[dim] == 1.\n\nExamples\n\njulia> x = [1 2 3; 4 5 6; 7 8 9]\n3×3 Matrix{Int64}:\n 1  2  3\n 4  5  6\n 7  8  9\n\njulia> FourierTools.slice(x, 1, 1)\n1×3 view(::Matrix{Int64}, 1:1, 1:3) with eltype Int64:\n 1  2  3\n\n\n\n\n\n","category":"function"},{"location":"utils/#FourierTools.slice_indices","page":"Utility Functions","title":"FourierTools.slice_indices","text":"slice_indices(a, dim, index)\n\na should be the axes obtained by axes(arr) of an array. dim is the dimension to be selected and index the index of it.\n\nExamples\n\njulia> FourierTools.slice_indices((1:10, 1:20, 1:12, 1:33), 1, 3)\n(3:3, 1:20, 1:12, 1:33)\n\n\n\n\n\n","category":"function"}]
}
