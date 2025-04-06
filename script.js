$(document).ready(function(){

    // Initialize AOS library for animations
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('active');
    });

    $(window).on('scroll load', function(){

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('active');

        if($(window).scrollTop() > 60){
            $('.header').addClass('active');
        }
        else{
            $('.header').removeClass('active');
        }

        $('section').each(function(){

            let top = $(window).scrollTop();
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');

            if(top >= offset && top < offset + height){
                $('.navbar a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

        // Animate counter when in viewport
        $('.counter .box').each(function() {
            let $this = $(this);
            let countElement = $this.find('.count');
            
            if (countElement.length && !countElement.hasClass('counted') && isInViewport($this)) {
                countElement.addClass('counted');
                countUp(countElement);
            }
        });
    });

    // Count up animation function
    function countUp(element) {
        let target = parseInt(element.attr('data-target'));
        let duration = 2000; // 2 seconds
        let start = 0;
        let increment = target / (duration / 30); // Update every 30ms
        
        let interval = setInterval(function() {
            start += increment;
            element.text(Math.floor(start));
            
            if (start >= target) {
                element.text(target);
                clearInterval(interval);
            }
        }, 30);
    }

    // Check if element is in viewport
    function isInViewport(element) {
        let elementTop = element.offset().top;
        let elementBottom = elementTop + element.outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();
        
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Trigger count animation for elements already in viewport on page load
    $('.counter .box').each(function() {
        let $this = $(this);
        let countElement = $this.find('.count');
        
        if (countElement.length && isInViewport($this)) {
            countElement.addClass('counted');
            countUp(countElement);
        }
    });

    // Glow effect on futuristic elements
    setInterval(function() {
        $('.header .logo, .heading').css('text-shadow', '0 0 10px rgba(0, 247, 255, 0.7)');
        setTimeout(function() {
            $('.header .logo, .heading').css('text-shadow', '0 0 5px rgba(0, 247, 255, 0.3)');
        }, 1000);
    }, 2000);

    // BMI Calculator enhancements
    $('.input-group input').on('focus', function() {
        $(this).siblings('.input-line').css('width', '100%');
    });

    $('.input-group input').on('blur', function() {
        $(this).siblings('.input-line').css('width', '0');
    });

    // BMI calculation function
    window.calculateBMI = function() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100;
        
        // Validate inputs
        if (!weight || !height || weight <= 0 || height <= 0) {
            document.getElementById('bmi-recommendation').textContent = 'Please enter valid weight and height values';
            return;
        }
        
        const bmi = weight / (height * height);
        const bmiValue = bmi.toFixed(1);
        
        // Update BMI value display
        document.getElementById('bmi-value').textContent = bmiValue;
        
        // Reset all category items
        $('.category-item').removeClass('active');
        
        // Determine BMI category and recommendation
        let category, recommendation;
        let circumference = 2 * Math.PI * 40; // Circumference of circle with r=40
        let dashOffset;
        
        if (bmi < 18.5) {
            category = 'underweight';
            recommendation = `Your BMI (${bmiValue}) indicates you're underweight. Consider consulting with a nutritionist for a balanced diet plan.`;
            dashOffset = circumference * 0.25;
            $('.result-indicator').css('stroke', '#ffd700');
        } else if (bmi < 25) {
            category = 'normal';
            recommendation = `Your BMI (${bmiValue}) is within the normal range. Maintain your healthy lifestyle!`;
            dashOffset = circumference * 0.5;
            $('.result-indicator').css('stroke', '#00ff00');
        } else if (bmi < 30) {
            category = 'overweight';
            recommendation = `Your BMI (${bmiValue}) indicates you're overweight. Consider our AI-guided fitness program to reach your optimal weight.`;
            dashOffset = circumference * 0.75;
            $('.result-indicator').css('stroke', '#ffa500');
        } else {
            category = 'obese';
            recommendation = `Your BMI (${bmiValue}) indicates obesity. Our personalized fitness and nutrition plans can help you achieve a healthier weight.`;
            dashOffset = 0;
            $('.result-indicator').css('stroke', '#ff4500');
        }
        
        // Animate the indicator
        $('.result-indicator').css({
            'stroke-dasharray': circumference,
            'stroke-dashoffset': circumference
        });
        
        setTimeout(function() {
            $('.result-indicator').css({
                'stroke-dashoffset': dashOffset,
                'transition': 'stroke-dashoffset 1.5s ease-out'
            });
        }, 50);
        
        // Highlight active category
        $(`.category-item[data-category="${category}"]`).addClass('active');
        
        // Update recommendation
        document.getElementById('bmi-recommendation').textContent = recommendation;
        
        // Add success animation
        $('.bmi-calculator').addClass('calculated');
        setTimeout(function() {
            $('.bmi-calculator').removeClass('calculated');
        }, 1500);
    };

})